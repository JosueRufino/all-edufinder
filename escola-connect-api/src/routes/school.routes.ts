import { Router } from 'express';

import { SchoolController } from '../controllers/school.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rotas públicas
router.get('/', SchoolController.list);
router.get('/:id', SchoolController.getById);

// Rotas protegidas por JWT
router.post('/', authMiddleware as any, SchoolController.create);
router.patch('/:id', authMiddleware as any, SchoolController.update);
router.delete('/:id', authMiddleware as any, SchoolController.delete);

export default router;
