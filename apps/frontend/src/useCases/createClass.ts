import { ClassRepository } from '../repositories/classRepository';
import type { CreateClassDTO } from 'booking-backend';

export async function createClass(data: CreateClassDTO): Promise<void> {
  return await ClassRepository.create(data);
}
