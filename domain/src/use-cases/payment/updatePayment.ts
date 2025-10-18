import { PaymentStatus } from '../../entities';
import { PaymentService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

interface UpdatePayload {
  id: string;
  status: PaymentStatus;
}

export interface UpdatePaymentDeps {
  paymentService: PaymentService;
}

export async function updatePayment(
  { paymentService }: UpdatePaymentDeps,
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

  return updatedPayment;
}
