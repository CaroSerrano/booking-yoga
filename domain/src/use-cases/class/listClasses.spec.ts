import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { ClassStatus } from '../../entities/class.js';
import { faker } from '@faker-js/faker';
import { getClasses, listAvailableClasses } from './listClasses.js';

describe('List classes', () => {
  test('listAvailableClasses should return all available (future) classes', async () => {
    const classService = new MockedClassService([
      classMock({ status: ClassStatus.COMPLETED }),
      classMock({ status: ClassStatus.CANCELLED }),
      classMock({ end: faker.date.past(), status: ClassStatus.COMPLETED }),
      classMock(),
    ]);

    const result = await listAvailableClasses({ classService });
    expect(result).toHaveLength(3);
  });

  test('getClasses should return filtered classes', async () => {
    const classService = new MockedClassService([
      classMock({ teacherId: '1', title: 'Gentle Yoga' }),
      classMock({ teacherId: '1', title: 'Hatha Yoga' }),
      classMock({ teacherId: '1', title: 'Hatha Yoga' }),
      classMock(),
    ]);
    const result = await getClasses(
      { classService },
      { teacherId: '1', title: 'Hatha Yoga' }
    );
    expect(result).toHaveLength(2);
  });
});
