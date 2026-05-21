import { Request, Response } from 'express';

import { prisma } from '../prisma/client';

export class SchoolController {
  static async list(req: Request, res: Response) {
    try {
      const { province, type, rating } = req.query;
      const where: any = {};

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

      const schools = await prisma.school.findMany({
        where,
        orderBy: {
          rating: 'desc'
        }
      });

      return res.json({
        success: true,
        data: schools
      });

    } catch (error) {
      console.error('Erro ao listar escolas:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao listar escolas'
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const school = await prisma.school.findUnique({
        where: { id: id as string }
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

    } catch (error) {
      console.error('Erro ao buscar escola:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao obter escola'
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const {
        name,
        tagline,
        description,
        type,
        province,
        address,
        verified,
        rating,
        phone,
        email,
        website,
        images,
        latitude,
        longitude,
        reviews_count,
        students_count,
        founded_year,
        pricing,
        facilities,
        schedule,
        stats,
        courses
      } = req.body;

      if (!name || !description || !type || !province || !address) {
        return res.status(400).json({
          success: false,
          message: 'Os campos name, description, type, province e address são obrigatórios'
        });
      }

      const school = await prisma.school.create({
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
          images: Array.isArray(images) ? images : [],
          courses: Array.isArray(courses) ? courses : [],
          latitude: latitude !== undefined && latitude !== null ? Number(latitude) : null,
          longitude: longitude !== undefined && longitude !== null ? Number(longitude) : null,
          reviews_count: reviews_count !== undefined && reviews_count !== null ? Number(reviews_count) : 0,
          students_count: students_count !== undefined && students_count !== null ? Number(students_count) : null,
          founded_year: founded_year !== undefined && founded_year !== null ? Number(founded_year) : null,
          pricing: pricing || null,
          facilities: facilities || null,
          schedule: schedule || null,
          stats: stats || null
        }
      });

      return res.status(201).json({
        success: true,
        data: school
      });

    } catch (error) {
      console.error('Erro ao criar escola:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao criar escola'
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const schoolExists = await prisma.school.findUnique({
        where: { id: id as string }
      });

      if (!schoolExists) {
        return res.status(404).json({
          success: false,
          message: 'Escola não encontrada'
        });
      }

      const updatedSchool = await prisma.school.update({
        where: { id: id as string },
        data: {
          ...data,
          // Garante tipagem correta para campos numéricos/booleanos se fornecidos
          rating: data.rating !== undefined ? Number(data.rating) : undefined,
          verified: data.verified !== undefined ? Boolean(data.verified) : undefined,
          latitude: data.latitude !== undefined && data.latitude !== null ? Number(data.latitude) : undefined,
          longitude: data.longitude !== undefined && data.longitude !== null ? Number(data.longitude) : undefined,
          reviews_count: data.reviews_count !== undefined && data.reviews_count !== null ? Number(data.reviews_count) : undefined,
          students_count: data.students_count !== undefined && data.students_count !== null ? Number(data.students_count) : undefined,
          founded_year: data.founded_year !== undefined && data.founded_year !== null ? Number(data.founded_year) : undefined,
          courses: Array.isArray(data.courses) ? data.courses : undefined,
        }
      });

      return res.json({
        success: true,
        data: updatedSchool
      });

    } catch (error) {
      console.error('Erro ao editar escola:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao editar escola'
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const schoolExists = await prisma.school.findUnique({
        where: { id: id as string }
      });

      if (!schoolExists) {
        return res.status(404).json({
          success: false,
          message: 'Escola não encontrada'
        });
      }

      await prisma.school.delete({
        where: { id: id as string }
      });

      return res.json({
        success: true,
        data: { id, message: 'Escola eliminada com sucesso' }
      });

    } catch (error) {
      console.error('Erro ao eliminar escola:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao eliminar escola'
      });
    }
  }
}
