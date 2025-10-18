import { describe, test, expect } from 'vitest';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { paymentMock } from '../../entities/mocks/payment-mock';
import { listUserPayments } from './listUserPayments';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';

describe('List User Payments', () => {
  test('should return all payments with the specified userId', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ userId: '1' }),
      paymentMock({ userId: '1' }),
      paymentMock({ userId: '3' }),
      paymentMock({ userId: '2' }),
    ]);
    const classService = new MockedClassService([]);
    const bookingService = new MockedBookingService([]);

    const result = await listUserPayments(
      { paymentService, classService, bookingService },
      { userId: '1' }
    );
    expect(result).toHaveLength(2);
  });
});
