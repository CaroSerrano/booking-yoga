import type { UserService } from '../../services/index.js';
import generateTimestamps from '../../utils/generateTimestamps.js';
import { UserStatus, Role } from '../../entities/index.js';
import { ValidationError } from '../../utils/customErrors.js';

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
export interface AuthDeps {
  userService: UserService;
  hasher: PasswordHasher;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phoneNumber: string;
  role?: Role;
  password: string;
}

export async function register(
  { userService, hasher }: AuthDeps,
  { name, email, phoneNumber, password, role }: RegisterPayload
) {
  const foundUser = await userService.findByEmail(email);
  if (foundUser) {
    throw new ValidationError('User already registered');
  }
  const hashedPassword = await hasher.hash(password);

  await userService.save({
    id: crypto.randomUUID(),
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    role: role ?? Role.USER,
    status: UserStatus.ACTIVE,
    ...generateTimestamps(),
  });
}
