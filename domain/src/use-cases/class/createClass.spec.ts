import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { createClass } from './createClass.js';
import { ClassStatus } from '../../entities/class.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';

describe('Create class', () => {
  test('should create a class with all required fields', async () => {
    const classService = new MockedClassService([]);
    const userService = new MockedUserService([userMock({ id: '1' })]);
    const result = await createClass(
      { classService, userService },
      {
        title: 'Hatha Yoga',
        teacherId: '1',
        start: '2025-11-02T18:00:00Z',
        end: '2025-11-02T19:00:00Z',
        location: 'Draguignan',
        address: '135-1 Rue des Pins',
        totalSlots: 12,
        bookingPrice: 80,
        description: 'bla',
      }
    );
    expect(result).toBeUndefined();
    expect(classService.classes).toHaveLength(1);
    expect(classService.classes[0]).toStrictEqual({
      id: expect.any(String),
      title: 'Hatha Yoga',
      teacherId: '1',
      start: new Date('2025-11-02T18:00:00Z'),
      end: new Date('2025-11-02T19:00:00Z'),
      location: 'Draguignan',
      address: '135-1 Rue des Pins',
      totalSlots: 12,
      bookingPrice: 80,
      description: 'bla',
      availableSlots: 12,
      status: ClassStatus.SCHEDULE,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('if a mandatory field is missing, should return an error with an appropiate message', async () => {
    const classService = new MockedClassService([]);
    const userService = new MockedUserService([userMock({ id: '1' })]);
    await expect(() =>
      createClass(
        { classService, userService },
        // @ts-expect-error - Testing validation with missing required field
        {
          teacherId: '1',
          start: '2025-11-02T18:00:00Z',
          end: '2025-11-02T19:00:00Z',
          location: 'Draguignan',
          totalSlots: 12,
        }
      )
    ).rejects.toThrow('title is required');
    expect(classService.classes).toHaveLength(0);
  });

  test('if user with teacherId is not found, should return an error with an appropiate message', async () => {
    const classService = new MockedClassService([]);
    const userService = new MockedUserService([]);
    await expect(() =>
      createClass(
        { classService, userService },
        {
          title: 'Hatha Yoga',
          teacherId: '1',
          start: '2025-11-02T18:00:00Z',
          end: '2025-11-02T19:00:00Z',
          totalSlots: 12,
        }
      )
    ).rejects.toThrow('Teacher not found');
  });

  test('if end is before start, an error with an appropiate message is expected', async () => {
    const classService = new MockedClassService([]);
    const userService = new MockedUserService([]);
    await expect(() =>
      createClass(
        { classService, userService },
        {
          title: 'Hatha Yoga',
          teacherId: '1',
          start: '2025-11-02T18:00:00Z',
          end: '2025-11-01T19:00:00Z',
          totalSlots: 12,
        }
      )
    ).rejects.toThrow('End date must be after start date');
  });
});
