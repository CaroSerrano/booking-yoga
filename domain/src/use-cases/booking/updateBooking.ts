import { BookingStatus } from '../../entities';
import { BookingService, ClassService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

interface UpdatePayload {
  id: string;
  status?: BookingStatus;
}

export interface UpdateDeps {
  bookingService: BookingService;
  classService: ClassService;
}

export async function updateBooking(
  { bookingService, classService }: UpdateDeps,
  { id, status }: UpdatePayload
) {
  const bookingFound = await bookingService.findById(id);
  if (!bookingFound) {
    throw new NotFoundError('Booking not found');
  }
  let updatedBooking;

  if (status === BookingStatus.CANCELLED) {
    updatedBooking = await bookingService.updateOne(id, {
      status: BookingStatus.CANCELLED,
      updatedAt: new Date(),
    });
  }

  if (status === BookingStatus.CONFIRMED) {
    updatedBooking = await bookingService.updateOne(id, {
      status: BookingStatus.CONFIRMED,
      updatedAt: new Date(),
    });
  }

  if (updatedBooking?.status === BookingStatus.CONFIRMED) {
    const classFound = await classService.findById(updatedBooking.classId);
    if (!classFound) {
      throw new NotFoundError('Class not found');
    }
    await classService.updateOne(classFound.id, {
      availableSlots: Math.max(classFound.availableSlots - 1, 0),
    });
  }

  if (updatedBooking?.status === BookingStatus.CANCELLED) {
    const classFound = await classService.findById(updatedBooking.classId);
    if (!classFound) {
      throw new NotFoundError('Class not found');
    }
    await classService.updateOne(classFound.id, {
      availableSlots: classFound.availableSlots + 1,
    });
  }

  return updatedBooking;
}
