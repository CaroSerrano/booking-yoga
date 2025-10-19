import { describe, test, expect } from 'vitest';
import { BookingStatus, PaymentStatus } from '../../entities';
import { MockedPaymentService } from '../../services/mocks/mock-payment-service';
import { paymentMock } from '../../entities/mocks/payment-mock';
import { updatePayment } from './updatePayment';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';
import { bookingMock } from '../../entities/mocks/booking-mock';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { getBookingById } from '../booking/getBookingById';
import { getClassDetails } from '../class';

describe('Update payment', () => {
  test('When updating a payment, should return the updated payment', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ id: '1', bookingId: '1' }),
    ]);
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([classMock({ id: '1' })]);
    const result = await updatePayment(
      { paymentService, bookingService, classService },
      { id: '1', status: PaymentStatus.COMPLETED }
    );
    expect(result).toBeDefined();
    expect(result?.status).toBe(PaymentStatus.COMPLETED);
  });

  test('if the payment does not exist, an error is expected', async () => {
    const paymentService = new MockedPaymentService([]);
    const bookingService = new MockedBookingService([]);
    const classService = new MockedClassService([]);
    await expect(() =>
      updatePayment(
        { paymentService, bookingService, classService },
        { id: '1', status: PaymentStatus.COMPLETED }
      )
    ).rejects.toThrow('Payment not found');
  });

  test('if a payments is completed, status Booking properties should be updated properly', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ id: '1', bookingId: '1' }),
    ]);
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([
      classMock({ id: '1', totalSlots: 12, availableSlots: 12 }),
    ]);
    const paymentResult = await updatePayment(
      { paymentService, bookingService, classService },
      { id: '1', status: PaymentStatus.COMPLETED }
    );
    expect(paymentResult).toBeDefined();
    expect(paymentResult?.status).toBe(PaymentStatus.COMPLETED);

    const bookingResult = await getBookingById({ bookingService }, { id: '1' });
    expect(bookingResult?.status).toBe(BookingStatus.CONFIRMED);
  });

  test('if a payments is completed, availableSlots Class property should be updated properly', async () => {
    const paymentService = new MockedPaymentService([
      paymentMock({ id: '1', bookingId: '1' }),
    ]);
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([
      classMock({ id: '1', totalSlots: 12, availableSlots: 12 }),
    ]);
    const paymentResult = await updatePayment(
      { paymentService, bookingService, classService },
      { id: '1', status: PaymentStatus.COMPLETED }
    );
    expect(paymentResult).toBeDefined();
    expect(paymentResult?.status).toBe(PaymentStatus.COMPLETED);
    const classResult = await getClassDetails({ classService }, { id: '1' });
    expect(classResult.availableSlots).toBe(11);
  });
});
