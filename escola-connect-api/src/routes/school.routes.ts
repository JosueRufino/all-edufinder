import { Router } from 'express';

import { SchoolController } from '../controllers/school.controller';

const router = Router();

// Rotas públicas
router.get('/', SchoolController.list);
router.get('/:id', SchoolController.getById);

// Rotas de gestão (sem autenticação)
router.post('/', SchoolController.create);
router.patch('/:id', SchoolController.update);
router.delete('/:id', SchoolController.delete);

export default router;
