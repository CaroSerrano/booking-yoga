import { AuthRepository } from '../repositories/authRespository';
import type { LoginSchema } from 'booking-backend';
import type { UserResponseDTO } from 'booking-backend';

export async function loginUser(data: LoginSchema): Promise<UserResponseDTO> {
  return await AuthRepository.login(data);
}
