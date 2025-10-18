import { BookingStatus } from '../../entities';
import { BookingService } from '../../services';

interface UpdatePayload {
  id: string;
  paymentId: string;
}

interface UpdateDeps {
  bookingService: BookingService;
}

export async function updateBooking(
  { bookingService }: UpdateDeps,
  { id, paymentId }: UpdatePayload
) {
  const updatedBooking = await bookingService.updateOne(id, {
    paymentId,
    status: BookingStatus.CONFIRMED,
    updatedAt: new Date(),
  });

  return updatedBooking;
}
