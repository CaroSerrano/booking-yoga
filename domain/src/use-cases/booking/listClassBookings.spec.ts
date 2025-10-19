import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service.js';
import { bookingMock } from '../../entities/mocks/booking-mock.js';
import { listClassBookings } from './listClassBookings.js';

describe('List Class Bookings', () => {
  test('should return all bookings with the specified classId ', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ classId: '1' }),
      bookingMock({ classId: '1' }),
      bookingMock(),
    ]);
    const result = await listClassBookings(
      { bookingService },
      { classId: '1' }
    );
    expect(result).toHaveLength(2);
  });
});
