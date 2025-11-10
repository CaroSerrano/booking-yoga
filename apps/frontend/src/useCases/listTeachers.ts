import { UserRepository } from '../repositories/userRepository';
import type { UserResponseDTO } from 'booking-backend';

export async function listTeachers(): Promise<UserResponseDTO[]> {
  return await UserRepository.listTeachers();
}
