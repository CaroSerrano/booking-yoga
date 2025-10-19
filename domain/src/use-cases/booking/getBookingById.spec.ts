import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service.js';
import { bookingMock } from '../../entities/mocks/booking-mock.js';
import { getBookingById } from './getBookingById.js';

describe('Get Booking by ID', () => {
  test('should return the booking with the specified ID', async () => {
    const bookingService = new MockedBookingService([bookingMock({ id: '1' })]);
    const result = await getBookingById({ bookingService }, { id: '1' });
    expect(result).toBeDefined();
  });

  test('if booking does not exist, an error is expected', async () => {
    const bookingService = new MockedBookingService([]);
    await expect(() =>
      getBookingById({ bookingService }, { id: '1' })
    ).rejects.toThrow('Booking not found');
  });
});
