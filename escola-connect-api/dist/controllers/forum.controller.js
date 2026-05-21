"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumController = void 0;
const client_1 = require("../prisma/client");
class ForumController {
    static async listTopics(req, res) {
        try {
            const topics = await client_1.prisma.forumTopic.findMany({
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
        }
        catch (error) {
            console.error('Erro ao listar tópicos do fórum:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao obter tópicos do fórum'
            });
        }
    }
    static async getTopicById(req, res) {
        try {
            const { id } = req.params;
            const topic = await client_1.prisma.forumTopic.findUnique({
                where: { id: id },
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
            await client_1.prisma.forumTopic.update({
                where: { id: id },
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
        }
        catch (error) {
            console.error('Erro ao obter detalhes do tópico:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao obter detalhes do tópico'
            });
        }
    }
    static async createTopic(req, res) {
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
            const topic = await client_1.prisma.forumTopic.create({
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
        }
        catch (error) {
            console.error('Erro ao criar tópico:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao criar tópico'
            });
        }
    }
    static async replyTopic(req, res) {
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
            const topicExists = await client_1.prisma.forumTopic.findUnique({
                where: { id: topicId }
            });
            if (!topicExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Tópico não encontrado'
                });
            }
            const reply = await client_1.prisma.forumReply.create({
                data: {
                    content,
                    topicId: topicId,
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
        }
        catch (error) {
            console.error('Erro ao responder ao tópico:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao responder ao tópico'
            });
        }
    }
}
exports.ForumController = ForumController;
//# sourceMappingURL=forum.controller.js.map