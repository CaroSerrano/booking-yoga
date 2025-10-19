import type { UserDeps } from './register.js';

interface DeleteUserPayload {
  id: string;
}

export async function deleteUser(
  { userService }: UserDeps,
  { id }: DeleteUserPayload
) {
  await userService.delete(id);
}
