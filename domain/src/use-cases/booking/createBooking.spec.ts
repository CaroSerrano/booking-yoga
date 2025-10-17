import { describe, test, expect } from 'vitest';
import { MockedBookingService } from '../../services/mocks/mock-booking-service';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { MockedUserService } from '../../services/mocks/mock-user-service';
import { userMock } from '../../entities/mocks/user-mock';
import { classMock } from '../../entities/mocks/class-mock';
import { BookingStatus } from '../../entities';
import { createBooking } from './createBooking';

describe('Create booking', () => {
  test('should create a booking with all required fields', async () => {
    const bookingService = new MockedBookingService([]);
    const classService = new MockedClassService([classMock({ id: '1' })]);
    const userService = new MockedUserService([userMock({ id: '1' })]);

    const result = await createBooking(
      { bookingService, classService, userService },
      {
        userId: '1',
        classId: '1',
      }
    );

    expect(result).toBeUndefined();
    expect(bookingService.bookings).toHaveLength(1);
    expect(bookingService.bookings[0]).toStrictEqual({
      id: expect.any(String),
      userId: '1',
      classId: '1',
      expiresAt: expect.any(Date),
      status: BookingStatus.PENDING,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('if a required field is missing, an error with an appropiate message is expected', async () => {
    const bookingService = new MockedBookingService([]);
    const classService = new MockedClassService([]);
    const userService = new MockedUserService([]);
    await expect(() =>
      createBooking(
        { bookingService, classService, userService },
        // @ts-expect-error - Testing validation with missing required field
        {
          classId: '1',
        }
      )
    ).rejects.toThrow('userId is required');
  });

});
