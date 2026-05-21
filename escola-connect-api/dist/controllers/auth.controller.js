"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("../prisma/client");
class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password, phone, province, role } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome, email e palavra-passe são obrigatórios'
                });
            }
            const userExists = await client_1.prisma.user.findUnique({
                where: { email }
            });
            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Este email já está registado'
                });
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            // Criar o utilizador
            const user = await client_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone: phone || null,
                    province: province || null,
                    role: role || 'student'
                }
            });
            // Gerar Token
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
            // Omitir a password da resposta por segurança
            const { password: _, ...userWithoutPassword } = user;
            return res.status(201).json({
                success: true,
                data: {
                    token,
                    user: userWithoutPassword
                }
            });
        }
        catch (error) {
            console.error('Erro no registo:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao registar utilizador'
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email e palavra-passe são obrigatórios'
                });
            }
            const user = await client_1.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }
            const passwordMatch = await bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    success: false,
                    message: 'Credenciais inválidas'
                });
            }
            // Gerar Token
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '7d' });
            // Omitir a password da resposta por segurança
            const { password: _, ...userWithoutPassword } = user;
            return res.json({
                success: true,
                data: {
                    token,
                    user: userWithoutPassword
                }
            });
        }
        catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao autenticar'
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map