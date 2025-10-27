import { z } from 'zod';
import { Role, UserStatus } from 'booking-domain';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(Role).default(Role.USER),
});

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  pass: z.string(),
});

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string().nullable(),
  status: z.enum(UserStatus),
  role: z.enum(Role),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const loginResponseSchema = userResponseSchema;

export type LoginResponseDTO = z.infer<typeof loginResponseSchema>;
export type UserResponseDTO = z.infer<typeof userResponseSchema>;
