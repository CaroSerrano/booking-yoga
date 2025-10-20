import { z } from 'zod';
import { Role } from 'booking-domain';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(Role).default(Role.USER),
});

export const loginSchema = z.object({
    email: z.email('Invalid email'),
    pass: z.string()
})