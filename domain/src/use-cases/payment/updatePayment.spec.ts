import { describe, test, expect } from 'vitest';
import { PaymentStatus } from '../../entities';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { paymentMock } from '../../entities/mocks/payment-mock';
import { updatePayment } from './updatePayment';

describe('Update payment', () => {
  test('When updating a payment, should return the updated payment', async () => {
    const paymentService = new MockedPaymentService([paymentMock({ id: '1' })]);
    const result = await updatePayment(
      { paymentService },
      { id: '1', status: PaymentStatus.COMPLETED }
    );
    expect(result).toBeDefined();
    expect(result?.status).toBe(PaymentStatus.COMPLETED);
  });

  test('if the payment does not exist, an error is expected', async () => {
    const paymentService = new MockedPaymentService([]);
    await expect(() =>
      updatePayment(
        { paymentService },
        { id: '1', status: PaymentStatus.COMPLETED }
      )
    ).rejects.toThrow('Payment not found');
  });
});
