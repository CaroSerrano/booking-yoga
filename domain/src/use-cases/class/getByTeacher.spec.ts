import { describe, expect, test } from 'vitest';
import { getClassByTeacher } from './getByTeacher.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';

describe('Get by teacher', () => {
  test('getByTeacher should return all classes taught by the specified teacherId', async () => {
    const classService = new MockedClassService([
      classMock({
        teacherId: '1',
      }),
      classMock({
        teacherId: '1',
      }),
      classMock({
        teacherId: '2',
      }),
    ]);
    const result = await getClassByTeacher({ classService }, { teacherId: '1' });
    expect(result).toHaveLength(2);
  });
});
