import type { SecureUser } from '../entities/index.js';
import type { LoginPayload, RegisterPayload } from '../use-cases/index.js';

export interface AuthService {
  login: (data: LoginPayload) => Promise<SecureUser | undefined>;
  register: (data: RegisterPayload) => Promise<void>;
}
