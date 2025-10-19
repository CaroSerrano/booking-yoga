import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service.js';
import { paymentMock } from '../../entities/mocks/payment-mock.js';
import { listBookingPayments } from './listBookingPayments.js';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { MockedBookingService } from '../../services/mocks/mock-booking-service.js';

describe('List Booking Payments', () => {
  test('should return payment with the specified bookingId', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ bookingId: '1' }),
    ]);
    const classService = new MockedClassService([]);
    const bookingService = new MockedBookingService([]);

    const result = await listBookingPayments(
      { paymentService, bookingService, classService },
      { bookingId: '1' }
    );
    expect(result).toBeDefined();
  });
});
