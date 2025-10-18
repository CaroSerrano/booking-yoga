import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { PaymentStatus } from '../../entities';
import { createPayment } from './createPayment';

describe('Create payment', () => {
  test('should create a payment with all required fields', async () => {
    const paymentService = new MockedPaymentService([]);

    const result = await createPayment(
      { paymentService },
      {
        userId: '1',
        bookingId: '1',
        amount: 80,
        currency: 'USD'
      }
    );

    expect(result).toBeUndefined();
    expect(paymentService.payments).toHaveLength(1);
    expect(paymentService.payments[0]).toStrictEqual({
      id: expect.any(String),
      userId: '1',
      bookingId: '1',
      amount: 80,
      currency: 'USD',
      status: PaymentStatus.PENDING,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
