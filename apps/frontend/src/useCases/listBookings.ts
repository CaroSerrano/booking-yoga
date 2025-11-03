import type { Booking, BookingFilters } from 'booking-domain';
import { BookingRepository } from '../repositories/bookingRepository';

export async function listBookings(
  filters: BookingFilters
): Promise<Booking[]> {
  return await BookingRepository.listByFilters(filters);
}
