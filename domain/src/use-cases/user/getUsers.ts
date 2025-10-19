import { NotFoundError } from '../../utils/customErrors.js';
import type { UserDeps } from './register.js';

export async function listAllUsers({ userService }: UserDeps) {
  const users = await userService.findAll();
  return users.map(({ password, ...rest }: { password: string; [key: string]: any }) => rest);
}

export async function listActiveUsers({ userService }: UserDeps) {
  const users = await userService.findActive();
  return users.map(({ password, ...rest }: { password: string; [key: string]: any }) => rest);
}

export async function listStudents({ userService }: UserDeps) {
  const users = await userService.findStudents();
  return users.map(({ password, ...rest }: { password: string; [key: string]: any }) => rest);
}
interface GetByEmailPayload {
  email: string;
}
export async function getUserByEmail(
  { userService }: UserDeps,
  { email }: GetByEmailPayload
) {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw new NotFoundError('user not found')
  };
  const { password, ...safeUser } = user;
  return safeUser;
}
