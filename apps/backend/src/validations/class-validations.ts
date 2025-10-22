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

export const updateClassSchema = createClassSchema.partial();
