import type { UserResponseDTO } from 'booking-backend';

const BASE_URL = `${process.env.API_URL}/user`;

export const userApi = {
  async listTeachers(): Promise<UserResponseDTO[]> {
    const res = await fetch(`${BASE_URL}/teachers`, {
      credentials: 'include',
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || 'Teachers fetch failed');
    }
    return res.json();
  },
};
