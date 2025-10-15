import type { User } from "../entities/user.js";
import type { Service } from "../utils/types/services.js";

export interface UserService extends Service<User> {
  findActive(): Promise<User[]>;
  findStudents(): Promise<User[]>
  findByName: (name: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
}