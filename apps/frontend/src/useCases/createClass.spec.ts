import { vi, describe, it, expect } from 'vitest';
import { createClass } from '../useCases/createClass';
import { ClassRepository } from '../repositories/classRepository';
import type { CreateClassDTO } from 'booking-backend';

vi.mock('../repositories/classRepository');

describe('createClass', () => {
  it('crea una clase usando el repositorio', async () => {
    vi.mocked(ClassRepository.create).mockResolvedValue();
    const date = new Date().toISOString();
    await createClass({
      title: 'Yoga',
      start: date,
      end: date,
      totalSlots: 10,
      teacherId: '1',
    } as CreateClassDTO);

    expect(ClassRepository.create).toHaveBeenCalledWith({
      title: 'Yoga',
      start: date,
      end: date,
      totalSlots: 10,
      teacherId: '1',
    });
  });
});
