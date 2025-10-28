import { ClassStatus } from 'booking-domain';
import { z } from 'zod';

export const createClassSchema = z.object({
  title: z.string().min(1, 'title is required'),
  teacherId: z.string().min(1, 'teacherId is required'),
  start: z.string('start is required'),
  end: z.string('end is required'),
  status: z.enum(ClassStatus).default(ClassStatus.SCHEDULE).optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  bookingPrice: z.coerce.number().nonnegative().optional(),
  address: z.string().optional(),
  totalSlots: z.coerce.number('totalSlots is required').int().nonnegative(),
});

export type CreateClassDTO = z.infer<typeof createClassSchema>;

export const updateClassSchema = createClassSchema.partial();

export type UpdateClassDTO = z.infer<typeof updateClassSchema>;

export const classResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  teacherId: z.string(),
  start: z.string(),
  end: z.string(),
  status: z.enum(ClassStatus),
  totalSlots: z.string(),
  description: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  bookingPrice: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
});

export type ClassResponseDTO = z.infer<typeof classResponseSchema>;
