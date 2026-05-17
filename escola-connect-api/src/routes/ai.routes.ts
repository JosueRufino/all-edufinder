import { Router } from 'express';

import { AIController } from '../controllers/ai.controller';

const router = Router();

// Endpoint de recomendações inteligentes com IA
router.post('/recommend-schools', AIController.recommendSchools);

export default router;
