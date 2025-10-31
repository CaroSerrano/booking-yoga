import type { LoginSchema, RegisterSchema } from 'booking-backend';
import type { UserResponseDTO } from 'booking-backend';

const BASE_URL = 'http://localhost:3000/api/auth';

export const authApi = {
  async login(data: LoginSchema): Promise<UserResponseDTO> {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Login failed');
    }
    return res.json();
  },

  async register(data: RegisterSchema): Promise<void> {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Register failed');
    }
  },

  async logout(): Promise<void> {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Logout failed');
  },

  async getCurrentUser(): Promise<UserResponseDTO | undefined> {
    const res = await fetch(`${BASE_URL}/currentUser`, {
      credentials: 'include',
    });
    if (!res.ok) return undefined;
    return res.json();
  },
};
