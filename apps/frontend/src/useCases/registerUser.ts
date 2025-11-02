import { AuthRepository } from '../repositories/authRespository';
import type { RegisterSchema } from 'booking-backend';

export async function registerUser(data: RegisterSchema): Promise<void> {
  return await AuthRepository.register(data);
}
