import { describe, test, expect, vi, beforeEach } from 'vitest';
import { UserServiceImplementation } from './user-service.js';

const prismaMock = {
  user: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const service = new UserServiceImplementation(prismaMock as any);

describe('UserServiceImplementation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('findAll llama a prisma.user.findMany', async () => {
    prismaMock.user.findMany.mockResolvedValue(['user1']);
    const res = await service.findAll();
    expect(prismaMock.user.findMany).toHaveBeenCalled();
    expect(res).toEqual(['user1']);
  });

  test('findActive usa filtro status ACTIVE', async () => {
    prismaMock.user.findMany.mockResolvedValue([]);
    await service.findActive();
    expect(prismaMock.user.findMany).toHaveBeenCalledWith({ where: { status: 'ACTIVE' } });
  });

  test('findStudents usa filtro role USER', async () => {
    prismaMock.user.findMany.mockResolvedValue([]);
    await service.findStudents();
    expect(prismaMock.user.findMany).toHaveBeenCalledWith({ where: { role: 'USER' } });
  });

  test('findById devuelve undefined si no encuentra', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const res = await service.findById('x');
    expect(res).toBeUndefined();
  });

  test('findById devuelve usuario si existe', async () => {
    const fakeUser = { id: '1', name: 'Caro' };
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);
    const res = await service.findById('1');
    expect(res).toEqual(fakeUser);
  });

  test('findByEmail devuelve undefined si no encuentra', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const res = await service.findByEmail('a@b.com');
    expect(res).toBeUndefined();
  });

  test('findByEmail devuelve usuario si existe', async () => {
    const fakeUser = { id: '1', email: 'a@b.com' };
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);
    const res = await service.findByEmail('a@b.com');
    expect(res).toEqual(fakeUser);
  });

  test('save llama a prisma.user.create con los datos', async () => {
    const data = { id: '1', email: 'a@b.com' } as any;
    prismaMock.user.create.mockResolvedValue(data);
    await service.save(data);
    expect(prismaMock.user.create).toHaveBeenCalledWith({ data });
  });

  test('updateOne devuelve usuario actualizado', async () => {
    const updated = { id: '1', name: 'Caro' };
    prismaMock.user.update.mockResolvedValue(updated);
    const res = await service.updateOne('1', { name: 'Caro' });
    expect(prismaMock.user.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { name: 'Caro' } });
    expect(res).toEqual(updated);
  });

  test('delete llama a prisma.user.delete con id', async () => {
    prismaMock.user.delete.mockResolvedValue({});
    await service.delete('1');
    expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
