import { vi, describe, it, expect } from 'vitest';
import { updateClass } from '../useCases/updateClass';
import { ClassRepository } from '../repositories/classRepository';

vi.mock('../repositories/classRepository');

describe('updateClass', () => {
  it('actualiza una clase usando el repositorio', async () => {
    vi.mocked(ClassRepository.update).mockResolvedValue({
      id: '1',
      title: 'yoga',
      availableSlots: '5',
      end: '',
      start: '',
      status: 'SCHEDULE',
      teacherId: '',
      totalSlots: '10',
    });
    const fd = new FormData();
    fd.append('title', 'yoga');
    const res = await updateClass('1', fd as FormData);
    expect(res).toEqual({
      id: '1',
      title: 'yoga',
      availableSlots: '5',
      end: '',
      start: '',
      status: 'SCHEDULE',
      teacherId: '',
      totalSlots: '10',
    });

    expect(ClassRepository.update).toHaveBeenCalledWith('1', fd);
  });
});
