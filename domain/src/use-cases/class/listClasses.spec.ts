import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { ClassStatus } from '../../entities';
import { faker } from '@faker-js/faker';
import { listAvailableClasses } from './listClasses';

describe('List classes', () => {
  test('should return all available (future) classes', async () => {
    const classService = new MockedClassService([
      classMock({ status: ClassStatus.COMPLETED }),
      classMock({ status: ClassStatus.CANCELLED }),
      classMock({ end: faker.date.past(), status: ClassStatus.COMPLETED }),
      classMock(),
    ]);

    const result = await listAvailableClasses({ classService });
    expect(result).toHaveLength(3);
  });
});

