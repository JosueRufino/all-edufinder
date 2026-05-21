"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolController = void 0;
const client_1 = require("../prisma/client");
class SchoolController {
    static async list(req, res) {
        try {
            const { province, type, rating } = req.query;
            const where = {};
            if (province) {
                where.province = {
                    equals: String(province),
                    mode: 'insensitive'
                };
            }
            if (type) {
                where.type = {
                    equals: String(type),
                    mode: 'insensitive'
                };
            }
            if (rating) {
                const ratingVal = Number(rating);
                if (!isNaN(ratingVal)) {
                    where.rating = {
                        gte: ratingVal
                    };
                }
            }
            const schools = await client_1.prisma.school.findMany({
                where,
                orderBy: {
                    rating: 'desc'
                }
            });
            return res.json({
                success: true,
                data: schools
            });
        }
        catch (error) {
            console.error('Erro ao listar escolas:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao listar escolas'
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const school = await client_1.prisma.school.findUnique({
                where: { id: id }
            });
            if (!school) {
                return res.status(404).json({
                    success: false,
                    message: 'Escola não encontrada'
                });
            }
            return res.json({
                success: true,
                data: school
            });
        }
        catch (error) {
            console.error('Erro ao buscar escola:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao obter escola'
            });
        }
    }
    static async create(req, res) {
        try {
            const { name, tagline, description, type, province, address, verified, rating, phone, email, website, images } = req.body;
            if (!name || !description || !type || !province || !address) {
                return res.status(400).json({
                    success: false,
                    message: 'Os campos name, description, type, province e address são obrigatórios'
                });
            }
            const school = await client_1.prisma.school.create({
                data: {
                    name,
                    tagline: tagline || null,
                    description,
                    type,
                    province,
                    address,
                    verified: typeof verified === 'boolean' ? verified : false,
                    rating: rating !== undefined ? Number(rating) : 0,
                    phone: phone || null,
                    email: email || null,
                    website: website || null,
                    images: Array.isArray(images) ? images : []
                }
            });
            return res.status(201).json({
                success: true,
                data: school
            });
        }
        catch (error) {
            console.error('Erro ao criar escola:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao criar escola'
            });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const schoolExists = await client_1.prisma.school.findUnique({
                where: { id: id }
            });
            if (!schoolExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Escola não encontrada'
                });
            }
            const updatedSchool = await client_1.prisma.school.update({
                where: { id: id },
                data: {
                    ...data,
                    // Garante tipagem correta para campos numéricos/booleanos se fornecidos
                    rating: data.rating !== undefined ? Number(data.rating) : undefined,
                    verified: data.verified !== undefined ? Boolean(data.verified) : undefined
                }
            });
            return res.json({
                success: true,
                data: updatedSchool
            });
        }
        catch (error) {
            console.error('Erro ao editar escola:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao editar escola'
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const schoolExists = await client_1.prisma.school.findUnique({
                where: { id: id }
            });
            if (!schoolExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Escola não encontrada'
                });
            }
            await client_1.prisma.school.delete({
                where: { id: id }
            });
            return res.json({
                success: true,
                data: { id, message: 'Escola eliminada com sucesso' }
            });
        }
        catch (error) {
            console.error('Erro ao eliminar escola:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno ao eliminar escola'
            });
        }
    }
}
exports.SchoolController = SchoolController;
//# sourceMappingURL=school.controller.js.map