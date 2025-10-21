import { ClassStatus } from 'booking-domain';
import { z } from 'zod';

export const createClassSchema = z.object({
  title: z.string().min(1, 'title is required'),
  teacherId: z.string().min(1, 'teacherId is required'),
  start: z.string('start is required'),
  end: z.string('end is required'),
  status: z.enum(ClassStatus).default(ClassStatus.SCHEDULE),
  description: z.string(),
  location: z.string(),
  bookingPrice: z.coerce.number().nonnegative(),
  address: z.string(),
  totalSlots: z.coerce.number().int().nonnegative(),
});

export const updateClassSchema = createClassSchema.partial();
