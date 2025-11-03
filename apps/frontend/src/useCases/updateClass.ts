import { ClassRepository } from '../repositories/classRepository';
import type { ClassResponseDTO } from 'booking-backend';

export async function updateClass(
  id: string,
  data: FormData
): Promise<ClassResponseDTO> {
  return await ClassRepository.update(id, data);
}
