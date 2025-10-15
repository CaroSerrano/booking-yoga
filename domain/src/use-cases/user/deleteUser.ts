import { UserDeps } from './register';

interface DeleteUserPayload {
  id: string;
}

export async function deleteUser(
  { userService }: UserDeps,
  { id }: DeleteUserPayload
) {
  await userService.delete(id);
}
