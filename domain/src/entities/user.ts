import type { Entity } from '../utils/types/entity.js';

export const userStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type UserStatus = (typeof userStatus)[keyof typeof userStatus];

export const role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type Role = (typeof role)[keyof typeof role];

export interface User extends Entity {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  status: UserStatus;
  role: Role;
}

export type SecureUser = Omit<User, 'password'>;
