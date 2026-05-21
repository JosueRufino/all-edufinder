"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const client_1 = require("../prisma/client");
class CourseController {
    static async list(req, res) {
        try {
            const courses = await client_1.prisma.course.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return res.json({
                success: true,
                data: courses
            });
        }
        catch (error) {
            console.error('Erro ao listar cursos:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao listar cursos'
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const course = await client_1.prisma.course.findUnique({
                where: { id: id }
            });
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Curso não encontrado'
                });
            }
            return res.json({
                success: true,
                data: course
            });
        }
        catch (error) {
            console.error('Erro ao buscar curso:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao obter curso'
            });
        }
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map