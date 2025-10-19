import { describe, test, expect, vi, beforeEach } from 'vitest';
import { PaymentServiceImplementation } from './payment-service.js';

const prismaMock = {
  payment: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const service = new PaymentServiceImplementation(prismaMock as any);

describe('PaymentServiceImplementation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('findAll llama a prisma.payment.findMany', async () => {
    prismaMock.payment.findMany.mockResolvedValue(['p1']);
    const res = await service.findAll();
    expect(prismaMock.payment.findMany).toHaveBeenCalled();
    expect(res).toEqual(['p1']);
  });

  test('findById devuelve undefined si no encuentra', async () => {
    prismaMock.payment.findUnique.mockResolvedValue(null);
    const res = await service.findById('x');
    expect(res).toBeUndefined();
  });

  test('findById devuelve payment si existe', async () => {
    const fakePayment = { id: '1', amount: 100 };
    prismaMock.payment.findUnique.mockResolvedValue(fakePayment);
    const res = await service.findById('1');
    expect(res).toEqual(fakePayment);
  });

  test('save llama a prisma.payment.create con datos', async () => {
    const data = { id: '1', amount: 100 } as any;
    prismaMock.payment.create.mockResolvedValue(data);
    await service.save(data);
    expect(prismaMock.payment.create).toHaveBeenCalledWith({ data });
  });

  test('updateOne devuelve payment actualizado', async () => {
    const updated = { id: '1', amount: 150 };
    prismaMock.payment.update.mockResolvedValue(updated);
    const res = await service.updateOne('1', { amount: 150 });
    expect(prismaMock.payment.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { amount: 150 } });
    expect(res).toEqual(updated);
  });

  test('delete llama a prisma.payment.delete con id', async () => {
    prismaMock.payment.delete.mockResolvedValue({});
    await service.delete('1');
    expect(prismaMock.payment.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  test('findByBookingId devuelve undefined si no encuentra', async () => {
    prismaMock.payment.findUnique.mockResolvedValue(null);
    const res = await service.findByBookingId('b1');
    expect(res).toBeUndefined();
  });

  test('findByBookingId devuelve payment si existe', async () => {
    const fakePayment = { id: '1', bookingId: 'b1' };
    prismaMock.payment.findUnique.mockResolvedValue(fakePayment);
    const res = await service.findByBookingId('b1');
    expect(res).toEqual(fakePayment);
  });

  test('findByUserId llama a prisma.payment.findMany con userId', async () => {
    prismaMock.payment.findMany.mockResolvedValue([]);
    await service.findByUserId('u1');
    expect(prismaMock.payment.findMany).toHaveBeenCalledWith({ where: { userId: 'u1' } });
  });
});
