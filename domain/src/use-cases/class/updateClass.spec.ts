import { describe, test, expect } from 'vitest';
import { MockedClassService } from '../../services/mocks/mock-class-service';
import { classMock } from '../../entities/mocks/class-mock';
import { updateClass } from './updateClass';

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
  test('if class does not exist, an error is expected');
});
