import type { BookingDeps } from './createBooking.js';

export interface BookingFilters {
  classId?: string;
  userId?: string;
}
export async function listBookings(
  { bookingService }: BookingDeps,
  filters: BookingFilters
) {
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null)
  );
  return bookingService.findByFilters(activeFilters);
}
