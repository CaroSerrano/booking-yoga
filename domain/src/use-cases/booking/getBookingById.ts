import { BookingService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

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
