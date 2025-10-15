import { UserService } from '../../services';

interface RegisterDeps {
  userService: UserService;
}

export async function listAll({ userService }: RegisterDeps) {
  const users = await userService.findAll();
  return users.map(({ password, ...rest }) => rest);
}

export async function listActive({ userService }: RegisterDeps) {
  const users = await userService.findActive();
  console.log('usuarios activos: ', users)
  return users.map(({ password, ...rest }) => rest);
}

export async function listStudents({ userService }: RegisterDeps) {
  const users = await userService.findStudents();
  console.log('usuarios estudiantes: ', users)
  return users.map(({ password, ...rest }) => rest);
}
