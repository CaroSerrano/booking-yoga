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
});
