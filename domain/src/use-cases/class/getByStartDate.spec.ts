import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { faker } from '@faker-js/faker';
import { getClassByStartDate } from './getByStartDate';
import { ValidationError } from '../../utils/customErrors';

describe('Get by start date', () => {
  test('getByStartDate should return all classes that start on a specific date', async () => {
    const classService = new MockedClassService([
      classMock({
        start: faker.date.between({
          from: '2025-01-01T08:00:00.000Z',
          to: '2025-01-01T20:00:00.000Z',
        }),
      }),
      classMock({
        start: faker.date.between({
          from: '2025-01-01T08:00:00.000Z',
          to: '2025-01-01T20:00:00.000Z',
        }),
      }),
      classMock({
        start: faker.date.between({
          from: '2025-01-05T08:00:00.000Z',
          to: '2025-01-05T20:00:00.000Z',
        }),
      }),
    ]);

    const result = await getClassByStartDate(
      { classService },
      { start: '2025-01-01' }
    );
    expect(result).toHaveLength(2);
  });
  test('if the date format is invalid should return an error with an appropiate message', async () => {
    const classService = new MockedClassService([
      classMock({
        start: faker.date.between({
          from: '2025-01-05T08:00:00.000Z',
          to: '2025-01-05T20:00:00.000Z',
        }),
      }),
    ]);
    await expect(() =>
      getClassByStartDate({ classService }, { start: '05/01/25' })
    ).rejects.toThrow('Invalid date format (expected YYYY-MM-DD)');
    await expect(() =>
      getClassByStartDate({ classService }, { start: '2025-13-25' })
    ).rejects.toThrow('Invalid date value');
  });
});
