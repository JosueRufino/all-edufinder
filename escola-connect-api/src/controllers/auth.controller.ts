import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../prisma/client';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone, province, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Nome, email e palavra-passe são obrigatórios'
        });
      }

      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'Este email já está registado'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o utilizador
      const user = await prisma.user.create({
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
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'supersecret',
        { expiresIn: '7d' }
      );

      // Omitir a password da resposta por segurança
      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json({
        success: true,
        data: {
          token,
          user: userWithoutPassword
        }
      });

    } catch (error) {
      console.error('Erro no registo:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao registar utilizador'
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email e palavra-passe são obrigatórios'
        });
      }

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Gerar Token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'supersecret',
        { expiresIn: '7d' }
      );

      // Omitir a password da resposta por segurança
      const { password: _, ...userWithoutPassword } = user;

      return res.json({
        success: true,
        data: {
          token,
          user: userWithoutPassword
        }
      });

    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao autenticar'
      });
    }
  }
}