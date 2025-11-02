import { vi, describe, it, expect } from 'vitest';
import { loginUser } from '../useCases/loginUser';
import { AuthRepository } from '../repositories/authRespository';
import { Role, UserStatus } from 'booking-domain';
import type { LoginSchema } from 'booking-backend';

vi.mock('../repositories/authRespository');

describe('loginUser', () => {
  it('retorna el usuario logueado', async () => {
    const fakeUser = {
      id: '1',
      name: 'Paula',
      email: 'sss',
      phoneNumber: '123',
      role: Role.USER,
      status: UserStatus.ACTIVE,
    };
    vi.mocked(AuthRepository.login).mockResolvedValue(fakeUser);

    const result = await loginUser({ email: 'a', pass: 'b' } as LoginSchema);

    expect(result).toEqual(fakeUser);
    expect(AuthRepository.login).toHaveBeenCalledWith({
      email: 'a',
      pass: 'b',
    });
  });
});
