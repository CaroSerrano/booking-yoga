import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service.js';
import { bookingMock } from '../../entities/mocks/booking-mock.js';
import { listUserBookings } from './listUserBookings.js';

describe('List User Bookings', () => {
  test('should return all bookings with the specified userId ', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ userId: '1' }),
      bookingMock({ userId: '1' }),
      bookingMock(),
    ]);
    const result = await listUserBookings({ bookingService }, { userId: '1' });
    expect(result).toHaveLength(2);
  });
});
