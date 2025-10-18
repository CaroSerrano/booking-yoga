import { PaymentStatus } from '../../entities';
import { PaymentService } from '../../services';
import { NotFoundError } from '../../utils/customErrors';

interface UpdatePayload {
  id: string;
  status: PaymentStatus;
}

export interface UpdateDeps {
  paymentService: PaymentService;
}

export async function updatePayment(
  { paymentService }: UpdateDeps,
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
