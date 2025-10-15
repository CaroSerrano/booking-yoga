import { UserService } from '../../services';
import generateTimestamps from '../../utils/generateTimestamps';
import { UserStatus, Role } from '../../entities';

export interface UserDeps {
  userService: UserService;
}

interface RegisterPayload {
  name: string;
  email: string;
  phoneNumber?: string;
  role?: Role;
  password: string;
}

export async function register(
  { userService }: UserDeps,
  { name, email, phoneNumber, password, role }: RegisterPayload
) {
  const foundUser = await userService.findByEmail(email);
  if (foundUser) {
    return new Error();
  }

  await userService.save({
    id: crypto.randomUUID(),
    name,
    email,
    phoneNumber,
    password,
    role: role? role : Role.USER,
    status: UserStatus.ACTIVE,
    ...generateTimestamps(),
  });
}
