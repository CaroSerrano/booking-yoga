import type { UserService } from '../../services/index.js';
import generateTimestamps from '../../utils/generateTimestamps.js';
import { UserStatus, Role } from '../../entities/index.js';

export interface UserDeps {
  userService: UserService;
}

interface RegisterPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role?: Role;
  password: string;
}

export async function register(
  { userService }: UserDeps,
  { name, email, phoneNumber, password, role }: RegisterPayload
) {
  const foundUser = await userService.findByEmail(email);
  if (foundUser) {
    throw new Error('User already registered');
  }

  await userService.save({
    id: crypto.randomUUID(),
    name,
    email,
    phoneNumber,
    password,
    role: role ?? Role.USER,
    status: UserStatus.ACTIVE,
    ...generateTimestamps(),
  });
}
