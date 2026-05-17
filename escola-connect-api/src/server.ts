import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import schoolRoutes from './routes/school.routes';
import forumRoutes from './routes/forum.routes';
import courseRoutes from './routes/course.routes';
import aiRoutes from './routes/ai.routes';

dotenv.config();

const app = express();

// Configuração de CORS para permitir acesso do frontend Angular
app.use(cors());

// Analisadores de corpo de requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definição das rotas da API
app.use('/auth', authRoutes);
app.use('/schools', schoolRoutes);
app.use('/forum', forumRoutes);
app.use('/courses', courseRoutes);
app.use('/ai', aiRoutes);

// Rota raiz inicial
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API do Escola Connect está a funcionar perfeitamente 🚀',
    version: '1.0.0'
  });
});

// Middleware global para tratamento de erros não capturados
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro global não tratado:', err);
  return res.status(500).json({
    success: false,
    message: 'Ocorreu um erro interno no servidor.'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Escola Connect API] Servidor a funcionar na porta ${PORT} 🚀`);
});