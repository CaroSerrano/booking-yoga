import type { BookingDeps } from './createBooking.js';

export interface BookingFilters {
  classId: string;
  userId: string;
}
export async function listBookings(
  { bookingService }: BookingDeps,
  filters: BookingFilters
) {
  return bookingService.findByFilters(filters);
}
