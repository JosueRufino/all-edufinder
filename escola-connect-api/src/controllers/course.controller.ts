import { Request, Response } from 'express';

import { prisma } from '../prisma/client';

export class CourseController {
  static async list(req: Request, res: Response) {
    try {
      const courses = await prisma.course.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.json({
        success: true,
        data: courses
      });

    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao listar cursos'
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const course = await prisma.course.findUnique({
        where: { id: id as string }
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

    } catch (error) {
      console.error('Erro ao buscar curso:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao obter curso'
      });
    }
  }
}
