import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';
import { bookingMock } from '../../entities/mocks/booking-mock';
import { BookingStatus } from '../../entities';
import { updateBooking } from './updateBooking';

describe('Update booking', () => {
  test('When updating a booking, should return the updated booking', async () => {
    const bookingService = new MockedBookingService([bookingMock({ id: '1' })]);
    const result = await updateBooking(
      { bookingService },
      { id: '1', paymentId: '2' }
    );
    expect(result).toBeDefined();
    expect(result?.paymentId).toBe('2');
    expect(result?.status).toBe(BookingStatus.CONFIRMED);
  });
});
