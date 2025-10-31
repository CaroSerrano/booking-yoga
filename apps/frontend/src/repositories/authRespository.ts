import { authApi } from '../api/authApi.js';
import type { LoginSchema, RegisterSchema } from 'booking-backend';
import type { UserResponseDTO } from 'booking-backend';

export const AuthRepository = {
  login: (data: LoginSchema): Promise<UserResponseDTO> => authApi.login(data),
  register: (data: RegisterSchema): Promise<void> => authApi.register(data),
  logout: (): Promise<void> => authApi.logout(),
  currentUser: (): Promise<UserResponseDTO | undefined> =>
    authApi.getCurrentUser(),
};
