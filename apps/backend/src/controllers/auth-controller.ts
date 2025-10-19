import { login, register, Role, ValidationError } from 'booking-domain';
import { userService } from 'src/services/index.js';
import type { Request, Response, NextFunction } from 'express';
import {
  loginSchema,
  registerSchema,
} from 'src/validations/auth-validations.js';
import { createHash, isValidPassword } from 'src/utils/auth.js';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'test';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = registerSchema.parse(req.body);
    const hashedPassword = await createHash(data.password);
    await register(
      { userService },
      {
        ...data,
        role: data.role ?? Role.USER,
        password: hashedPassword,
      }
    );
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
    const user = await login({ userService }, data);
    if (!(await isValidPassword(user, data.pass))) {
      throw new ValidationError('Invalid credentials');
    }
    const { password, ...safeUser } = user;
    const token = jwt.sign({ email: user.email, role: user.role }, secret);
    res.status(201).json({ token, safeUser });
  } catch (error: unknown) {
    next(error);
  }
}
