import type { Booking } from '../entities/booking.js';
import type { BookingFilters } from '../use-cases/booking/listBookingByFilter.js';
import type { Service } from '../utils/types/services.js';

export interface BookingService extends Service<Booking> {
  findByUserAndClass: (
    classId: string,
    userId: string
  ) => Promise<Booking | undefined>;
  findByFilters: (filters: BookingFilters) => Promise<Booking[]>;
}
