import { describe, test, expect, vi, beforeEach } from 'vitest';
import { BookingServiceImplementation } from './booking-service.js';

const prismaMock = {
  booking: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const service = new BookingServiceImplementation(prismaMock as any);

describe('BookingServiceImplementation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('findAll llama a prisma.booking.findMany', async () => {
    prismaMock.booking.findMany.mockResolvedValue(['b1']);
    const res = await service.findAll();
    expect(prismaMock.booking.findMany).toHaveBeenCalled();
    expect(res).toEqual(['b1']);
  });

  test('findById devuelve undefined si no encuentra', async () => {
    prismaMock.booking.findUnique.mockResolvedValue(null);
    const res = await service.findById('x');
    expect(res).toBeUndefined();
  });

  test('findById devuelve booking si existe', async () => {
    const fakeBooking = { id: '1', classId: 'c1', userId: 'u1' };
    prismaMock.booking.findUnique.mockResolvedValue(fakeBooking);
    const res = await service.findById('1');
    expect(res).toEqual(fakeBooking);
  });

  test('save llama a prisma.booking.create con datos', async () => {
    const data = { id: '1', classId: 'c1', userId: 'u1' } as any;
    prismaMock.booking.create.mockResolvedValue(data);
    await service.save(data);
    expect(prismaMock.booking.create).toHaveBeenCalledWith({ data });
  });

  test('updateOne devuelve booking actualizado', async () => {
    const updated = { id: '1', classId: 'c1', userId: 'u1' };
    prismaMock.booking.update.mockResolvedValue(updated);
    const res = await service.updateOne('1', { classId: 'c1' });
    expect(prismaMock.booking.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { classId: 'c1' } });
    expect(res).toEqual(updated);
  });

  test('delete llama a prisma.booking.delete con id', async () => {
    prismaMock.booking.delete.mockResolvedValue({});
    await service.delete('1');
    expect(prismaMock.booking.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  test('findByClassId llama a prisma.booking.findMany con classId', async () => {
    prismaMock.booking.findMany.mockResolvedValue([]);
    await service.findByClassId('c1');
    expect(prismaMock.booking.findMany).toHaveBeenCalledWith({ where: { classId: 'c1' } });
  });

  test('findByUserId llama a prisma.booking.findMany con userId', async () => {
    prismaMock.booking.findMany.mockResolvedValue([]);
    await service.findByUserId('u1');
    expect(prismaMock.booking.findMany).toHaveBeenCalledWith({ where: { userId: 'u1' } });
  });

  test('findByUserAndClass devuelve undefined si no encuentra', async () => {
    prismaMock.booking.findFirst.mockResolvedValue(null);
    const res = await service.findByUserAndClass('c1', 'u1');
    expect(res).toBeUndefined();
  });

  test('findByUserAndClass devuelve booking si existe', async () => {
    const fakeBooking = { id: '1', classId: 'c1', userId: 'u1' };
    prismaMock.booking.findFirst.mockResolvedValue(fakeBooking);
    const res = await service.findByUserAndClass('c1', 'u1');
    expect(res).toEqual(fakeBooking);
  });
});
