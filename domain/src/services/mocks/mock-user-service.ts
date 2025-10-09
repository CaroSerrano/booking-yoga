import { type User } from '../../entities/user.js';
import type { UserService } from '../user-service.js';

export class MockedUserService implements UserService {
  users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  updateOne = async (id: string, data: Partial<User>) => {
    throw new Error()
  };
  findAll = async () => {
    throw new Error()
  };
  findById = async (id: string) => {
    throw new Error()
  };
  findByName = async (name: string) => {
    throw new Error()
  };
  save = async (data: User) => {
    throw new Error()
  };
  findByEmail = async (email: string) => {
    throw new Error()
  };
  delete = async (id: string) => {
    throw new Error()
  };
}
