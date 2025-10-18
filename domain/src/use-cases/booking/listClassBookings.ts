import { UpdateDeps } from './updateBooking';

interface ListClassBookingPayload {
  classId: string;
}

export async function listClassBookings(
  { bookingService }: UpdateDeps,
  { classId }: ListClassBookingPayload
) {
  const bookings = await bookingService.findByClassId(classId);
  return bookings;
}
