import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service.js';
import { bookingMock } from '../../entities/mocks/booking-mock.js';
import { BookingStatus } from '../../entities/booking.js';
import { updateBooking } from './updateBooking.js';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { getClassDetails } from '../class/getClassDetails.js';

describe('Update booking', () => {
  test('if the booking does not exist, an error is expected', async () => {
    const bookingService = new MockedBookingService([]);
    const classService = new MockedClassService([]);
    await expect(() =>
      updateBooking(
        { bookingService, classService },
        { id: '1' }
      )
    ).rejects.toThrow('Booking not found');
  });

  test('if a booking is cancelLed, availableSlots Class property should be updated properly', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([
      classMock({ id: '1', totalSlots: 13, availableSlots: 12 }),
    ]);
    await updateBooking(
      { bookingService, classService },
      { id: '1', status: BookingStatus.CANCELLED }
    );
    const classResult = await getClassDetails({ classService }, { id: '1' });
    expect(classResult.availableSlots).toBe(13);
  });
});
