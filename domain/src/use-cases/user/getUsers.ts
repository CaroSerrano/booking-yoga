import { SecureUser } from '../../entities';
import { NotFoundError } from '../../utils/customErrors';
import { UserDeps } from './register';

export async function listAllUsers({ userService }: UserDeps): Promise<SecureUser[]> {
  const users = await userService.findAll();
  return users.map(({ password, ...rest }) => rest);
}

export async function listActiveUsers({ userService }: UserDeps): Promise<SecureUser[]> {
  const users = await userService.findActive();
  return users.map(({ password, ...rest }) => rest);
}

export async function listStudents({ userService }: UserDeps): Promise<SecureUser[]> {
  const users = await userService.findStudents();
  return users.map(({ password, ...rest }) => rest);
}
interface GetByEmailPayload {
  email: string;
}
export async function getUserByEmail(
  { userService }: UserDeps,
  { email }: GetByEmailPayload
): Promise<SecureUser> {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw new NotFoundError('user not found')
  };
  const { password, ...safeUser } = user;
  return safeUser;
}
