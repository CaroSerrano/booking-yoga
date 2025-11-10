import type { UserResponseDTO } from 'booking-backend';
import { userApi } from '../api/userApi';

export const UserRepository = {
  listTeachers: (): Promise<UserResponseDTO[]> => userApi.listTeachers(),
};
