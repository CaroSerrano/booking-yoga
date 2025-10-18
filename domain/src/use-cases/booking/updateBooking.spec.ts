import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';
import { bookingMock } from '../../entities/mocks/booking-mock';
import { BookingStatus } from '../../entities';
import { updateBooking } from './updateBooking';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { getClassDetails } from '../class';

describe('Update booking', () => {
  test('When updating a booking, should return the updated booking', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([classMock({ id: '1' })]);

    const result = await updateBooking(
      { bookingService, classService },
      { id: '1', paymentId: '2' }
    );
    expect(result).toBeDefined();
    expect(result?.paymentId).toBe('2');
    expect(result?.status).toBe(BookingStatus.CONFIRMED);
  });

  test('if the booking does not exist, an error is expected', async () => {
    const bookingService = new MockedBookingService([]);
    const classService = new MockedClassService([]);
    await expect(() =>
      updateBooking(
        { bookingService, classService },
        { id: '1', paymentId: '2' }
      )
    ).rejects.toThrow('Booking not found');
  });

  test('if a booking is canceled, availableSlots Class property should be updated properly', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([
      classMock({ id: '1', totalSlots: 13, availableSlots: 12 }),
    ]);
    await updateBooking(
      { bookingService, classService },
      { id: '1', status: BookingStatus.CANCELED }
    );
    const classResult = await getClassDetails({ classService }, { id: '1' });
    expect(classResult.availableSlots).toBe(13);
  });
});
