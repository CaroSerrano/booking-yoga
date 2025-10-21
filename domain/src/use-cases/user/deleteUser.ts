import type { UserService } from "../../services/index.js";


export interface UserDeps {
  userService: UserService;
}
interface DeleteUserPayload {
  id: string;
}

export async function deleteUser(
  { userService }: UserDeps,
  { id }: DeleteUserPayload
) {
  await userService.delete(id);
}
