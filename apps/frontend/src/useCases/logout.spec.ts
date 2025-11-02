import { vi, describe, it, expect } from 'vitest';
import { logoutUser } from '../useCases/logoutUser';
import { AuthRepository } from '../repositories/authRespository';

vi.mock('../repositories/authRespository');

describe('logoutUser', () => {
  it('llama a AuthRepository.logout', async () => {
    vi.mocked(AuthRepository.logout).mockResolvedValue();

    await logoutUser();

    expect(AuthRepository.logout).toHaveBeenCalled();
  });
});
