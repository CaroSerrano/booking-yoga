import { type User } from '../../entities/user.js';
import type { UserService } from '../user-service.js';

export class MockedUserService implements UserService {
  users: User[] = [];

  constructor(users: User[]) {
    this.users = users;
  }

  updateOne = async (id: string, data: Partial<User>) => {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...data } as User;
    return this.users[index];
  };
  findAll = async () => {
    return this.users;
  };
  findActive = async () => {
    return this.users.filter((u) => u.status === 'ACTIVE');
  };
  findStudents = async () => {
    return this.users.filter((u) => u.role === 'USER' && u.status === 'ACTIVE');
  };
  findById = async (id: string) => {
    return this.users.find((user) => user.id == id);
  };

  save = async (data: User) => {
    this.users.push(data);
  };
  findByEmail = async (email: string) => {
    return this.users.find((user) => user.email == email);
  };
  delete = async (id: string) => {
    this.users = this.users.filter((user) => user.id !== id);
  };
}
