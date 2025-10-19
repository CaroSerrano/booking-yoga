import { describe, test, expect } from 'vitest';
import { UserStatus, Role } from '../../entities/index.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';
import { register } from './register.js';

describe('Register', () => {
  test('when registering, should create a user with all required fields', async () => {
    const userService = new MockedUserService([
      userMock({
        name: 'Carolina Serrano',
        email: 'caroserrano@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        status: UserStatus.ACTIVE,
        role: Role.ADMIN,
      }),
    ]);

    const result = await register(
      { userService },
      {
        email: 'pablo@example.com',
        name: 'pablo perez',
        password: 'secret',
        role: Role.ADMIN,
        phoneNumber: '151651651',
      }
    );

    expect(result).toBeUndefined();
    expect(userService.users).toHaveLength(2);
    expect(userService.users[1]).toStrictEqual({
      id: expect.any(String),
      name: 'pablo perez',
      email: 'pablo@example.com',
      password: 'secret',
      phoneNumber: '151651651',
      status: 'ACTIVE',
      role: Role.ADMIN,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  test('if no role is provided, a User type user is created by default', async () => {
    const userService = new MockedUserService([]);

    const result = await register(
      { userService },
      {
        email: 'pablo@example.com',
        name: 'pablo perez',
        password: 'secret',
        phoneNumber: '151651651',
      }
    );

    expect(result).toBeUndefined();
    expect(userService.users).toHaveLength(1);
    expect(userService.users[0]).toStrictEqual({
      id: expect.any(String),
      name: 'pablo perez',
      email: 'pablo@example.com',
      password: 'secret',
      phoneNumber: '151651651',
      status: 'ACTIVE',
      role: Role.USER,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
  test('if the email is already registered, an error is expected', async () => {
    const userService = new MockedUserService([
      userMock({
        name: 'Carolina Serrano',
        email: 'caroserrano@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        status: UserStatus.ACTIVE,
        role: Role.ADMIN,
      }),
    ]);
    await expect(() =>
      register(
        { userService },
        {
          email: 'caroserrano@example.com',
          name: 'pablo perez',
          password: 'secret',
          phoneNumber: '151651651',
        }
      )
    ).rejects.toThrow('User already registered');
    expect(userService.users).toHaveLength(1);
  });
});
