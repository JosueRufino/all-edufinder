"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("../prisma/client");
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Token de autenticação não fornecido'
            });
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            return res.status(401).json({
                success: false,
                message: 'Erro no token de autenticação'
            });
        }
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme || '')) {
            return res.status(401).json({
                success: false,
                message: 'Token mal formatado'
            });
        }
        const secret = process.env.JWT_SECRET || 'supersecret';
        jsonwebtoken_1.default.verify(token || '', secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido ou expirado'
                });
            }
            const payload = decoded;
            // Buscar o utilizador na base de dados para garantir que existe e obter a sua Role atualizada
            const user = await client_1.prisma.user.findUnique({
                where: { id: payload.id },
                select: { id: true, email: true, role: true }
            });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Utilizador não encontrado'
                });
            }
            // Anexar o utilizador à requisição
            req.user = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            return next();
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro interno no middleware de autenticação'
        });
    }
}
//# sourceMappingURL=auth.js.map