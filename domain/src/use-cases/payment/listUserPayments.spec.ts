import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { paymentMock } from '../../entities/mocks/payment-mock';
import { listUserPayments } from './listUserPayments';

describe('List User Payments', () => {
  test('should return all payments with the specified userId', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ userId: '1' }),
      paymentMock({ userId: '1' }),
      paymentMock({ userId: '3' }),
      paymentMock({ userId: '2' }),
    ]);

    const result = await listUserPayments({ paymentService }, { userId: '1' });
    expect(result).toHaveLength(2);
  });
});
