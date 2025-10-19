import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { ClassStatus } from '../../entities/class.js';
import { getClassDetails } from './getClassDetails.js';

describe('Get class details', () => {
  test('should return the class with the provided id', async () => {
    const classService = new MockedClassService([
      classMock({ id: '1' }),
      classMock(),
      classMock(),
    ]);

    const result = await getClassDetails({ classService }, { id: '1' });
    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: '1',
      title: expect.any(String),
      description: expect.any(String),
      teacherId: expect.any(String),
      start: expect.any(Date),
      end: expect.any(Date),
      status: ClassStatus.SCHEDULE,
      location: expect.any(String),
      address: expect.any(String),
      totalSlots: expect.any(Number),
      bookingPrice: expect.any(Number),
      availableSlots: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
  test('if class not exist, an error is expected', async () => {
    const classService = new MockedClassService([]);
    await expect(() =>
      getClassDetails({ classService }, { id: '1' })
    ).rejects.toThrow('Class not found');
  });
});
