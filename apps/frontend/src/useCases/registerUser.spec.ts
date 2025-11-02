import { vi, describe, it, expect } from 'vitest';
import { registerUser } from '../useCases/registerUser';
import { AuthRepository } from '../repositories/authRespository';
import type { RegisterSchema } from 'booking-backend';

vi.mock('../repositories/authRespository');

describe('registerUser', () => {
  it('llama al repositorio con los datos de registro', async () => {
    vi.mocked(AuthRepository.register).mockResolvedValue();
    await registerUser({
      email: 'a',
      password: 'b',
      name: 'aa',
      phoneNumber: '1',
    } as RegisterSchema);

    expect(AuthRepository.register).toHaveBeenCalledWith({
      email: 'a',
      password: 'b',
      name: 'aa',
      phoneNumber: '1',
    });
  });
});
