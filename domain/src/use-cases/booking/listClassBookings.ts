import type { BookingService } from '../../services/index.js';

interface ListClassBookingDeps {
  bookingService: BookingService;
}

interface ListClassBookingPayload {
  classId: string;
}

export async function listClassBookings(
  { bookingService }: ListClassBookingDeps,
  { classId }: ListClassBookingPayload
) {
  const bookings = await bookingService.findByClassId(classId);
  return bookings;
}
