import { describe, expect, test } from 'vitest';
import { getByTeacher } from './getByTeacher';
import { classMock } from '../../entities/mocks/class-mock';
import { MockedClassService } from '../../services/mocks/mock-class-service';

describe('Get by teacher', () => {
  test('getByTeacher should return all classes taught by the specified teacherId', async () => {
    const classService = new MockedClassService([
      classMock({
        teacher: '1',
      }),
      classMock({
        teacher: '1',
      }),
      classMock({
        teacher: '2',
      }),
    ]);
    const result = await getByTeacher({ classService }, { teacher: '1' });
    expect(result).toHaveLength(2);
  });
});
