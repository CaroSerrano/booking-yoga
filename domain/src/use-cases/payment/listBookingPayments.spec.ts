import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service.js';
import { paymentMock } from '../../entities/mocks/payment-mock.js';
import { listBookingPayments } from './listBookingPayments.js';

describe('List Booking Payments', () => {
  test('should return payment with the specified bookingId', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ bookingId: '1' }),
    ]);

    const result = await listBookingPayments(
      { paymentService },
      { bookingId: '1' }
    );
    expect(result).toBeDefined();
  });
});
