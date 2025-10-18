import type { Booking } from '../entities/booking.js';
import type { Service } from '../utils/types/services.js';

export interface BookingService extends Service<Booking> {
  findByClassId: (classId: string) => Promise<Booking[]>;
  findByUserId: (userId: string) => Promise<Booking[]>;
  findByUserAndClass: (
    classId: string,
    userId: string
  ) => Promise<Booking | undefined>;
}
