import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { deleteClass } from './deleteClass.js';

describe('deleteClass', () => {
  test('should delete the class with the specified id', async () => {
    const classService = new MockedClassService([classMock({ id: '1' })]);
    await deleteClass({ classService }, { id: '1' });
    expect(classService.classes).toHaveLength(0);
  });

  test('if class is not found, an error with an appropiate message is expected', async () => {
    const classService = new MockedClassService([]);
    await expect(() =>
      deleteClass({ classService }, { id: '1' })
    ).rejects.toThrow('Class not found');
  });
});
