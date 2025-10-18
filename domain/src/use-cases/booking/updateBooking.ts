import { BookingStatus } from '../../entities';
import { BookingService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

interface UpdatePayload {
  id: string;
  paymentId: string;
}

export interface UpdateDeps {
  bookingService: BookingService;
}

export async function updateBooking(
  { bookingService }: UpdateDeps,
  { id, paymentId }: UpdatePayload
) {
  const bookingFound = await bookingService.findById(id);
  if (!bookingFound) {
    throw new NotFoundError('Booking not found');
  }
  const updatedBooking = await bookingService.updateOne(id, {
    paymentId,
    status: BookingStatus.CONFIRMED,
    updatedAt: new Date(),
  });

  return updatedBooking;
}
