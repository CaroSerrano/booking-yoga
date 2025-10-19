import type { BookingService } from '../../services/index.js';
import { NotFoundError } from '../../utils/customErrors.js';

interface GetBookingByIdDeps {
  bookingService: BookingService;
}

interface GetBookingByIdPayload {
  id: string;
}

export async function getBookingById(
  { bookingService }: GetBookingByIdDeps,
  { id }: GetBookingByIdPayload
) {
  const booking = await bookingService.findById(id);
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }
  return booking;
}
