import { NotFoundError } from '../../utils/customErrors.js';
import type { UserDeps } from './register.js';

export interface LoginPayload {
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
  return foundUser;
}
