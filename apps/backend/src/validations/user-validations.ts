import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.email('Invalid email'),
  phoneNumber: z.string(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
}).partial();
