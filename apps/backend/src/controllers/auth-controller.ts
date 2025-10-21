import { domainUseCases, type AuthDeps } from 'booking-domain';
import type { Request, Response, NextFunction } from 'express';
import {
  loginSchema,
  registerSchema,
} from 'src/validations/auth-validations.js';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'test';

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
      const token = jwt.sign({ email: user.email, role: user.role }, secret);
      res.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  },
});
