import { AuthRepository } from '../repositories/authRespository';
import type { UserResponseDTO } from 'booking-backend';

export async function getCurrentUser(): Promise<UserResponseDTO | undefined> {
  return await AuthRepository.currentUser();
}
