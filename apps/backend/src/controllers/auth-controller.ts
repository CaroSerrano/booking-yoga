import { domainUseCases, type AuthDeps } from 'booking-domain';
import type { Request, Response, NextFunction } from 'express';
import {
  loginResponseSchema,
  loginSchema,
  registerSchema,
} from 'src/validations/auth-validations.js';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'test';
const isProd = process.env.NODE_ENV === 'production';

export const authController = (deps: AuthDeps) => ({
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerSchema.parse(req.body);
      await domainUseCases.register.useCase(deps, data);
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);

      const user = await domainUseCases.login.useCase(deps, data);
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        secret
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
      const userData = {
        ...user,
        createdAt: user.createdAt?.toISOString() ?? null,
        updatedAt: user.updatedAt?.toISOString() ?? null,
      };
      const loginResponse = loginResponseSchema.parse(userData);
      res.status(200).json(loginResponse);
    } catch (error) {
      next(error);
    }
  },
  logout: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      });
      res.status(200).json({ message: 'Logged out' });
    } catch (error) {
      next(error);
    }
  },
  getCurrentUser: (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: 'No token' });
      const decoded = jwt.verify(token, secret);
      res.json(decoded);
    } catch (error) {
      next(error);
    }
  },
});
