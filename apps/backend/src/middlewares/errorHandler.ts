import type { Request, Response, NextFunction } from 'express';
import { ValidationError, NotFoundError } from 'booking-domain';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.issues });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
