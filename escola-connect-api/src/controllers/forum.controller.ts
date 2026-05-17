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
      const { title, content } = req.body;
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
}
