import { NotFoundError, ValidationError } from '../../utils/customErrors.js';
import type { UserDeps } from './register.js';

interface LoginPayload {
  email: string;
  pass: string;
}

export async function login(
  { userService }: UserDeps,
  { email, pass }: LoginPayload
) {
  const foundUser = await userService.findByEmail(email);
  if (!foundUser) {
    throw new NotFoundError('User not found');
  }

  if (foundUser.password !== pass) {
    throw new ValidationError('Wrong credentials');
  }
  const { password, ...safeUser } = foundUser;
  return safeUser;
}
