import { vi, describe, it, expect } from 'vitest';
import { UserRepository } from '../repositories/userRepository';
import { Role, UserStatus } from 'booking-domain';
import type { UserResponseDTO } from 'booking-backend';
import { listTeachers } from './listTeachers';

vi.mock('../repositories/userRepository');

describe('listTeachers', () => {
  it('lista los profesores', async () => {
    const fakeUser = {
      id: '1',
      name: 'Paula',
      email: 'sss',
      phoneNumber: '123',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } satisfies UserResponseDTO;

    vi.mocked(UserRepository.listTeachers).mockResolvedValue([fakeUser]);

    const result = await listTeachers();

    expect(result).toEqual([fakeUser]);
  });
});
