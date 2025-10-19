import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { bookingMock } from '../../entities/mocks/booking-mock';
import { updateBooking } from './updateBooking';
import { getClassDetails } from '../class';
import { BookingStatus } from '../../entities';

describe('Confirm Booking', () => {
  test('When a booking is confirmed, available slots of the class should be updated properly ', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ id: '1', classId: '1', userId: '1' }),
    ]);
    const classService = new MockedClassService([
      classMock({ id: '1', totalSlots: 12, availableSlots: 12, bookingPrice: 80 }),
    ]);
    const bookingResult = await updateBooking(
      { bookingService, classService },
      { id: '1', status: BookingStatus.CONFIRMED }
    );
    expect(bookingResult).toBeDefined();
    expect(bookingResult?.status).toBe(BookingStatus.CONFIRMED);

    const classResult = await getClassDetails({ classService }, { id: '1' });
    expect(classResult).toBeDefined();
    expect(classResult.availableSlots).toBe(11);
  });
});
