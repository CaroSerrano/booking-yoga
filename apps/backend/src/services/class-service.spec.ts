import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ClassServiceImplementation } from './class-service.js';

const prismaMock = {
  class: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const service = new ClassServiceImplementation(prismaMock as any);

describe('ClassServiceImplementation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('findAll llama a prisma.class.findMany', async () => {
    prismaMock.class.findMany.mockResolvedValue([{ id: '1' }]);
    const res = await service.findAll();
    expect(prismaMock.class.findMany).toHaveBeenCalled();
    expect(res).toEqual([{ id: '1' }]);
  });

  test('findAvailable usa filtro end >= ahora', async () => {
    prismaMock.class.findMany.mockResolvedValue([]);
    await service.findAvailable();
    expect(prismaMock.class.findMany).toHaveBeenCalledWith({
      where: { end: { gte: expect.any(Date) } },
    });
  });

  test('findById devuelve undefined si no encuentra', async () => {
    prismaMock.class.findUnique.mockResolvedValue(null);
    const res = await service.findById('x');
    expect(res).toBeUndefined();
  });

  test('findById devuelve clase si existe', async () => {
    const fakeClass = { id: '1', title: 'Yoga' };
    prismaMock.class.findUnique.mockResolvedValue(fakeClass);
    const res = await service.findById('1');
    expect(res).toEqual(fakeClass);
  });

  test('findByFilters llama a prisma.class.findMany con los filtros', async () => {
    await service.findByFilters({
      teacherId: '1',
      title: 'Hatha Yoga',
    });
    expect(prismaMock.class.findMany).toHaveBeenCalledWith({
      where: {
        teacherId: '1',
        title: { contains: 'Hatha Yoga', mode: 'insensitive' },
      },
    });
  });

  test('save llama a prisma.class.create con datos', async () => {
    const data = { id: '1', title: 'Yoga' } as any;
    prismaMock.class.create.mockResolvedValue(data);
    await service.save(data);
    expect(prismaMock.class.create).toHaveBeenCalledWith({ data });
  });

  test('updateOne llama a prisma.class.update con datos', async () => {
    const updated = { id: '1', title: 'Yoga Avanzado' };
    prismaMock.class.update.mockResolvedValue(updated);
    const res = await service.updateOne('1', { title: 'Yoga Avanzado' });
    expect(prismaMock.class.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { title: 'Yoga Avanzado' },
    });
    expect(res).toEqual(updated);
  });
});
