import type { BookingService } from '../../services/index.js';

interface ListUserBookingDeps {
  bookingService: BookingService;
}

interface ListUserBookingPayload {
  userId: string;
}

export async function listUserBookings(
  { bookingService }: ListUserBookingDeps,
  { userId }: ListUserBookingPayload
) {
  const bookings = await bookingService.findByUserId(userId);
  return bookings;
}
