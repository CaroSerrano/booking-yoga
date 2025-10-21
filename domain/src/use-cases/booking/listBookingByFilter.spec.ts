import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service.js';
import { bookingMock } from '../../entities/mocks/booking-mock.js';
import { listBookings } from './listBookingByFilter.js';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';

describe('listBookingByFilter', () => {
  test('should return filtered bookings', async () => {
    const bookingService = new MockedBookingService([
      bookingMock({ userId: '1' }),
      bookingMock({ userId: '2' }),
      bookingMock({ userId: '1', classId: '1' }),
    ]);
    const classService = new MockedClassService([]);
    const userService = new MockedUserService([]);
    const result = await listBookings(
      { bookingService, classService, userService },
      { userId: '1', classId: '1' }
    );
    expect(result).toHaveLength(1)
  });
});
