import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { createClass } from './createClass';
import { ClassStatus } from '../../entities';

describe('Create class', () => {
  test('should create a class with all required fields', async () => {
    const classService = new MockedClassService([]);
    const result = await createClass(
      { classService },
      {
        title: 'Hatha Yoga',
        teacher: '1',
        start: '2025-11-02T18:00:00Z',
        end: '2025-11-02T19:00:00Z',
        location: 'Draguignan',
        address: '135-1 Rue des Pins',
        totalSlots: 12,
      }
    );
    expect(result).toBeUndefined();
    expect(classService.classes).toHaveLength(1);
    expect(classService.classes[0]).toStrictEqual({
      id: expect.any(String),
      title: 'Hatha Yoga',
      teacher: '1',
      start: new Date('2025-11-02T18:00:00Z'),
      end: new Date('2025-11-02T19:00:00Z'),
      location: 'Draguignan',
      address: '135-1 Rue des Pins',
      totalSlots: 12,
      availableSlots:12,
      status: ClassStatus.SCHEDULE,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
  test('if a mandatory field is missing, should return an error with an appropiate message', async () => {
    const classService = new MockedClassService([]);
    await expect(() =>
      createClass(
        { classService },
        // @ts-expect-error - Testing validation with missing required field
        {
          teacher: '1',
          start: '2025-11-02T18:00:00Z',
          end: '2025-11-02T19:00:00Z',
          location: 'Draguignan',
          totalSlots: 12,
        }
      )
    ).rejects.toThrow('title is required');
    expect(classService.classes).toHaveLength(0);
  });
});
