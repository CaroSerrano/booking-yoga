import { UserService } from '../../services';
import { SecureUser } from '../../entities';

interface RegisterDeps {
  userService: UserService;
}

export async function listAll({ userService }: RegisterDeps): Promise<SecureUser[]> {
  const users = await userService.findAll();
  return users.map(({ password, ...rest }) => rest);
}

export async function listActive({ userService }: RegisterDeps): Promise<SecureUser[]> {
  const users = await userService.findActive();
  return users.map(({ password, ...rest }) => rest);
}

export async function listStudents({ userService }: RegisterDeps): Promise<SecureUser[]> {
  const users = await userService.findStudents();
  return users.map(({ password, ...rest }) => rest);
}
interface GetByEmailPayload {
  email: string;
}
export async function getUserByEmail(
  { userService }: RegisterDeps,
  { email }: GetByEmailPayload
): Promise<SecureUser | undefined> {
  const user = await userService.findByEmail(email);
  if (!user) return undefined;
  const { password, ...safeUser } = user;
  return safeUser;
}
