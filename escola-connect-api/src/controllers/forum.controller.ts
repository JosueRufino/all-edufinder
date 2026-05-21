import { Request, Response } from 'express';

import { prisma } from '../prisma/client';
import { AuthenticatedRequest } from '../types';

export class ForumController {
  static async listTopics(req: Request, res: Response) {
    try {
      const topics = await prisma.forumTopic.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              province: true
            }
          },
          _count: {
            select: {
              replies: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.json({
        success: true,
        data: topics
      });

    } catch (error) {
      console.error('Erro ao listar tópicos do fórum:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao obter tópicos do fórum'
      });
    }
  }

  static async getTopicById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const topic = await prisma.forumTopic.findUnique({
        where: { id: id as string },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              province: true
            }
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  role: true,
                  province: true
                }
              }
            },
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      });

      if (!topic) {
        return res.status(404).json({
          success: false,
          message: 'Tópico não encontrado'
        });
      }

      // Incrementar contagem de visualizações do tópico
      await prisma.forumTopic.update({
        where: { id: id as string },
        data: {
          views: {
            increment: 1
          }
        }
      });

      return res.json({
        success: true,
        data: topic
      });

    } catch (error) {
      console.error('Erro ao obter detalhes do tópico:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao obter detalhes do tópico'
      });
    }
  }

  static async createTopic(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, content, category, excerpt, tags } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Autenticação requerida'
        });
      }

      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: 'Título e conteúdo são obrigatórios'
        });
      }

      const topic = await prisma.forumTopic.create({
        data: {
          title,
          content,
          category: category || "Geral",
          excerpt: excerpt || content.substring(0, 150) + (content.length > 150 ? "..." : ""),
          tags: tags || [],
          userId
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      });

      return res.status(201).json({
        success: true,
        data: topic
      });

    } catch (error) {
      console.error('Erro ao criar tópico:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao criar tópico'
      });
    }
  }

  static async replyTopic(req: AuthenticatedRequest, res: Response) {
    try {
      const { id: topicId } = req.params;
      const { content } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Autenticação requerida'
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: 'O conteúdo da resposta é obrigatório'
        });
      }

      // Verificar se o tópico existe
      const topicExists = await prisma.forumTopic.findUnique({
        where: { id: topicId as string }
      });

      if (!topicExists) {
        return res.status(404).json({
          success: false,
          message: 'Tópico não encontrado'
        });
      }

      const reply = await prisma.forumReply.create({
        data: {
          content,
          topicId: topicId as string,
          userId
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      });

      // Atualizar o lastActivity do tópico correspondente
      await prisma.forumTopic.update({
        where: { id: topicId as string },
        data: {
          lastActivity: new Date()
        }
      });

      return res.status(201).json({
        success: true,
        data: reply
      });

    } catch (error) {
      console.error('Erro ao responder ao tópico:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao responder ao tópico'
      });
    }
  }

  static async updateTopic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, category, excerpt, tags, likes, views, isPinned, isAnswered } = req.body;

      const updated = await prisma.forumTopic.update({
        where: { id: id as string },
        data: {
          title,
          content,
          category,
          excerpt,
          tags,
          likes: likes !== undefined ? Number(likes) : undefined,
          views: views !== undefined ? Number(views) : undefined,
          isPinned,
          isAnswered,
          lastActivity: new Date()
        }
      });

      return res.json({
        success: true,
        data: updated
      });
    } catch (error) {
      console.error('Erro ao atualizar tópico:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao atualizar tópico'
      });
    }
  }

  static async updateReply(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content, likes } = req.body;

      const updated = await prisma.forumReply.update({
        where: { id: id as string },
        data: {
          content,
          likes: likes !== undefined ? Number(likes) : undefined
        }
      });

      return res.json({
        success: true,
        data: updated
      });
    } catch (error) {
      console.error('Erro ao atualizar resposta:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao atualizar resposta'
      });
    }
  }
}
