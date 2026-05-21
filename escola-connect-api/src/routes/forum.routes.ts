import { Router } from 'express';

import { ForumController } from '../controllers/forum.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rotas públicas do fórum
router.get('/topics', ForumController.listTopics);
router.get('/topics/:id', ForumController.getTopicById);

// Rotas protegidas (JWT obrigatório)
router.post('/topics', authMiddleware as any, ForumController.createTopic as any);
router.post('/topics/:id/replies', authMiddleware as any, ForumController.replyTopic as any);
router.patch('/topics/:id', authMiddleware as any, ForumController.updateTopic as any);
router.patch('/replies/:id', authMiddleware as any, ForumController.updateReply as any);

export default router;
