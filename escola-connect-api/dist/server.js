"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const school_routes_1 = __importDefault(require("./routes/school.routes"));
const forum_routes_1 = __importDefault(require("./routes/forum.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configuração de CORS para permitir acesso do frontend Angular
app.use((0, cors_1.default)());
// Analisadores de corpo de requisição
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Definição das rotas da API
app.use('/auth', auth_routes_1.default);
app.use('/schools', school_routes_1.default);
app.use('/forum', forum_routes_1.default);
app.use('/courses', course_routes_1.default);
app.use('/ai', ai_routes_1.default);
app.use('/upload', upload_routes_1.default);
// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'public', 'uploads')));
// Rota raiz inicial
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API do Escola Connect está a funcionar perfeitamente 🚀',
        version: '1.0.0'
    });
});
// Middleware global para tratamento de erros não capturados
app.use((err, req, res, next) => {
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
// Trigger reload after freeing port 3001
//# sourceMappingURL=server.js.map