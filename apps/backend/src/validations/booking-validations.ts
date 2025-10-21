import { BookingStatus } from 'booking-domain';
import { z } from 'zod';

export const createBookingSchema = z.object({
  classId: z.string().min(1, 'classId is required'),
  userId: z.string().min(1, 'userId is required'),
});

export const updateBookingSchema = z.object({
  status: z.enum(BookingStatus).optional(),
});
