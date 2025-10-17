import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { getByLocation } from './getByLocation';

describe('Get by location', () => {
  test('getByLocation should return all classes taught at the specified location', async () => {
    const classService = new MockedClassService([
      classMock({ location: 'Draguignan' }),
      classMock({ location: 'Draguignan' }),
      classMock({ location: 'Lorgues' }),
    ]);

    const result = await getByLocation(
      { classService },
      { location: 'Draguignan' }
    );
    expect(result).toHaveLength(2);
  });
});
