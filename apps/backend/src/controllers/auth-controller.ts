import { ValidationError } from 'booking-domain';
import { authService } from 'src/services/index.js';
import type { Request, Response, NextFunction } from 'express';
import {
  loginSchema,
  registerSchema,
} from 'src/validations/auth-validations.js';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'test';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.body) {
      throw new ValidationError('Missing data');
    }
    const data = registerSchema.parse(req.body);
    await authService.register(data);
    res.status(201).json({ message: 'User registered' });
  } catch (error: unknown) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = loginSchema.parse(req.body);
    const user = await authService.login(data);
    const token = jwt.sign({ email: user.email, role: user.role }, secret);
    res.status(201).json({ token, user });
  } catch (error: unknown) {
    next(error);
  }
}
