import { Router } from 'express';

import { CourseController } from '../controllers/course.controller';

const router = Router();

// Rotas públicas de cursos
router.get('/', CourseController.list);
router.get('/:id', CourseController.getById);

export default router;
