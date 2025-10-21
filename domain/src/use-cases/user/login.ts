import { NotFoundError, ValidationError } from '../../utils/customErrors.js';
import type { AuthDeps } from './register.js';

export interface LoginPayload {
  email: string;
  pass: string;
}

export async function login(
  { userService, hasher }: AuthDeps,
  { email, pass }: LoginPayload
) {
  const foundUser = await userService.findByEmail(email);
  if (!foundUser) {
    throw new NotFoundError('User not found');
  }
  if (!(await hasher.compare(pass, foundUser.password))) {
    throw new ValidationError('Invalid credentials');
  }
  const {password, ...safeUser} = foundUser
  return safeUser;
}
