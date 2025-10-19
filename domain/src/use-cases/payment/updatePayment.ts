import { BookingStatus, PaymentStatus } from '../../entities';
import { BookingService, ClassService, PaymentService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

interface UpdatePayload {
  id: string;
  status: PaymentStatus;
}

export interface UpdatePaymentDeps {
  paymentService: PaymentService;
  bookingService: BookingService;
  classService: ClassService;
}

export async function updatePayment(
  { paymentService, bookingService, classService }: UpdatePaymentDeps,
  { id, status }: UpdatePayload
) {
  const paymentFound = await paymentService.findById(id);
  if (!paymentFound) {
    throw new NotFoundError('Payment not found');
  }
  const updatedPayment = await paymentService.updateOne(id, {
    status,
    updatedAt: new Date(),
  });

  if (updatedPayment?.status === PaymentStatus.COMPLETED) {
    const updatedBooking = await bookingService.updateOne(
      paymentFound.bookingId,
      {
        status: BookingStatus.CONFIRMED,
      }
    );
    if (!updatedBooking) {
      throw new Error('Error updating booking');
    }
    const classFound = await classService.findById(updatedBooking.classId);
    if (!classFound) {
      throw new NotFoundError('Class not found');
    }
    await classService.updateOne(updatedBooking.classId, {
      availableSlots: Math.max(classFound.availableSlots - 1, 0),
    });
  }

  return updatedPayment;
}
