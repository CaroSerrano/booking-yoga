import { BookingStatus } from '../../entities';
import { BookingService, ClassService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

interface UpdatePayload {
  id: string;
  paymentId: string;
}

export interface UpdateDeps {
  bookingService: BookingService;
  classService: ClassService;
}

export async function updateBooking(
  { bookingService, classService }: UpdateDeps,
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

  if (updatedBooking?.status === 'CONFIRMED') {
    const classFound = await classService.findById(updatedBooking.classId);
    if (!classFound) {
      throw new NotFoundError('Class not found');
    }
    await classService.updateOne(classFound.id, {
      availableSlots: Math.max(classFound.availableSlots - 1, 0),
    });
  }

  return updatedBooking;
}
