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
    prismaMock.class.findMany.mockResolvedValue(['c1']);
    const res = await service.findAll();
    expect(prismaMock.class.findMany).toHaveBeenCalled();
    expect(res).toEqual(['c1']);
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

  test('findByStartDate busca por rango de fecha', async () => {
    prismaMock.class.findMany.mockResolvedValue([]);
    const date = new Date('2025-10-19');
    await service.findByStartDate(date);
    expect(prismaMock.class.findMany).toHaveBeenCalledWith({
      where: { start: { gte: expect.any(Date), lte: expect.any(Date) } },
      orderBy: { start: 'asc' },
    });
  });

  test('findByLocation llama con location', async () => {
    prismaMock.class.findMany.mockResolvedValue([]);
    await service.findByLocation('Studio A');
    expect(prismaMock.class.findMany).toHaveBeenCalledWith({
      where: { location: 'Studio A' },
    });
  });

  test('findByTitle llama con title', async () => {
    prismaMock.class.findMany.mockResolvedValue([]);
    await service.findByTitle('Yoga');
    expect(prismaMock.class.findMany).toHaveBeenCalledWith({
      where: { title: 'Yoga' },
    });
  });

  test('findByTeacher llama con teacherId', async () => {
    prismaMock.class.findMany.mockResolvedValue([]);
    await service.findByTeacher('t1');
    expect(prismaMock.class.findMany).toHaveBeenCalledWith({
      where: { teacherId: 't1' },
    });
  });

  test('save llama a prisma.class.create con datos', async () => {
    const data = { id: '1', title: 'Yoga' } as any;
    prismaMock.class.create.mockResolvedValue(data);
    await service.save(data);
    expect(prismaMock.class.create).toHaveBeenCalledWith({ data });
  });

  test('updateOne devuelve clase actualizada', async () => {
    const updated = { id: '1', title: 'Yoga Avanzado' };
    prismaMock.class.update.mockResolvedValue(updated);
    const res = await service.updateOne('1', { title: 'Yoga Avanzado' });
    expect(prismaMock.class.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { title: 'Yoga Avanzado' },
    });
    expect(res).toEqual(updated);
  });

  test('delete llama a prisma.class.delete con id', async () => {
    prismaMock.class.delete.mockResolvedValue({});
    await service.delete('1');
    expect(prismaMock.class.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });
});
