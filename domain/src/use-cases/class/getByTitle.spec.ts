import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { getClassByTitle } from './getByTitle.js';

describe('Get by title', () => {
  test('getByTitle should return all classes with the specified title', async () => {
    const classService = new MockedClassService([
      classMock({ title: 'Hatha Yoga' }),
      classMock({ title: 'Hatha Yoga' }),
      classMock({ title: 'Gentle Yoga' }),
    ]);

    const result = await getClassByTitle({ classService }, { title: 'Hatha Yoga' });
    expect(result).toHaveLength(2);
  });
});
