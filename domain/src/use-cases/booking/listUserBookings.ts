import { UpdateDeps } from './updateBooking';

interface ListUserBookingPayload {
  userId: string;
}

export async function listUserBookings(
  { bookingService }: UpdateDeps,
  { userId }: ListUserBookingPayload
) {
  const bookings = await bookingService.findByUserId(userId);
  return bookings
}
