import { AuthRepository } from '../repositories/authRespository';

export async function logoutUser(): Promise<void> {
  return await AuthRepository.logout();
}
