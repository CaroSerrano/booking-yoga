import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service.js';
import { classMock } from '../../entities/mocks/class-mock.js';
import { updateClass } from './updateClass.js';
import { ClassStatus } from '../../entities/class.js';

describe('Update class', () => {
  test('when class data is updated, should return the updated class', async () => {
    const classService = new MockedClassService([
      classMock({
        id: '1',
        totalSlots: 12,
      }),
    ]);
    const classFound = await classService.findById('1');
    if (!classFound) throw new Error('class not found in test setup');
    const result = await updateClass(
      { classService },
      { id: '1', totalSlots: 11 }
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      ...classFound,
      totalSlots: 11,
    });
  });
  test('if class does not exist, an error is expected', async () => {
    const classService = new MockedClassService([]);
    await expect(() =>
      updateClass({ classService }, { id: '1', totalSlots: 11 })
    ).rejects.toThrow('class not found');
  });
  test('test if it is possible to cancel a class', async () => {
    const classService = new MockedClassService([
      classMock({
        id: '1',
      }),
    ]);
    const classFound = await classService.findById('1');
    if (!classFound) throw new Error('class not found in test setup');
    expect(classFound.status).toBe(ClassStatus.SCHEDULE);
    const result = await updateClass(
      { classService },
      { id: '1', status: 'CANCELLED' }
    );
    expect(result).toBeDefined();
    expect(result?.status).toBe(ClassStatus.CANCELLED);
  });
});
