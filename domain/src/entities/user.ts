import type { Entity } from '../utils/types/entity.js';

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface User extends Entity {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  status: UserStatus;
  role: Role;
}

export type SecureUser = Omit<User, 'password'>;
