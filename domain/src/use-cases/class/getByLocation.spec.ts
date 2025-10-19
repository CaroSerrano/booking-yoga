import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { getClassByLocation } from './getByLocation.js';

describe('Get by location', () => {
  test('getByLocation should return all classes taught at the specified location', async () => {
    const classService = new MockedClassService([
      classMock({ location: 'Draguignan' }),
      classMock({ location: 'Draguignan' }),
      classMock({ location: 'Lorgues' }),
    ]);

    const result = await getClassByLocation(
      { classService },
      { location: 'Draguignan' }
    );
    expect(result).toHaveLength(2);
  });
});
