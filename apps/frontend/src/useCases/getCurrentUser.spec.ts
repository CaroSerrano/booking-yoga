import { vi, describe, it, expect } from 'vitest';
import { getCurrentUser } from './getCurrentUser';
import { AuthRepository } from '../repositories/authRespository';
import { Role, UserStatus } from 'booking-domain';

vi.mock('../repositories/authRespository');

describe('getCurrentUser', () => {
  it('retorna el usuario actual', async () => {
    const fakeUser = {
      id: '1',
      name: 'Paula',
      email: 'sss',
      phoneNumber: '123',
      role: Role.USER,
      status: UserStatus.ACTIVE,
    };
    vi.mocked(AuthRepository.currentUser).mockResolvedValue(fakeUser);

    const result = await getCurrentUser();

    expect(result).toEqual(fakeUser);
    expect(AuthRepository.currentUser).toHaveBeenCalled();
  });
});
