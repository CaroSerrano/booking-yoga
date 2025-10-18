import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { paymentMock } from '../../entities/mocks/payment-mock';
import { listBookingPayments } from './listBookingPayments';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';

describe('List Booking Payments', () => {
  test('should return all payments with the specified bookingId', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ bookingId: '1' }),
      paymentMock({ bookingId: '1' }),
      paymentMock({ bookingId: '3' }),
      paymentMock({ bookingId: '2' }),
    ]);
    const classService = new MockedClassService([]);
    const bookingService = new MockedBookingService([]);

    const result = await listBookingPayments(
      { paymentService, bookingService, classService },
      { bookingId: '1' }
    );
    expect(result).toHaveLength(2);
  });
});
