import { dataCleaner } from '../../utils/dataCleaner.js';
import type { BookingDeps } from './createBooking.js';

export interface BookingFilters {
  classId?: string;
  userId?: string;
}
export async function listBookings(
  { bookingService }: BookingDeps,
  filters: BookingFilters
) {
  const activeFilters = dataCleaner(filters);
  return bookingService.findByFilters(activeFilters);
}
