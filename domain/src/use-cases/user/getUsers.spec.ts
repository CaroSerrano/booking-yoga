import { describe, expect, test } from 'vitest';
import { MockedUserService } from '../../services/mocks/mock-user-service';
import { userMock } from '../../entities/mocks/user-mock';
import { Role, UserStatus } from '../../entities';
import { listActive, listAll, listStudents } from './getUsers';

describe('Get users', () => {
  test('listAll function, should return all users', async () => {
    const userService = new MockedUserService([
      userMock({
        name: 'Carolina Serrano',
        email: 'caroserrano@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        role: Role.ADMIN,
      }),
      userMock({
        name: 'Pablo Perez',
        email: 'pablito@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        status: UserStatus.INACTIVE,
      }),
    ]);

    const result = await listAll({ userService });
    expect(result).toHaveLength(2);
  });
  test('listActive function should return all active users', async () => {
    const userService = new MockedUserService([
      userMock({
        name: 'Carolina Serrano',
        email: 'caroserrano@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        role: Role.ADMIN,
      }),
      userMock({
        name: 'Pablo Perez',
        email: 'pablito@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        status: UserStatus.INACTIVE,
      }),
    ]);

    const result = await listActive({ userService });
    expect(result).toHaveLength(1);
  });

  test('listStudents function should return all active users excluding admins', async () => {
    const userService = new MockedUserService([
      userMock({
        name: 'Carolina Serrano',
        email: 'caroserrano@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        role: Role.ADMIN,
      }),
      userMock({
        name: 'Pablo Perez',
        email: 'pablito@example.com',
        phoneNumber: '123456789',
        password: 'secret',
        status: UserStatus.INACTIVE,
      }),
      userMock({
        name: 'Viviana Perez',
        email: 'viviana@example.com',
        phoneNumber: '123456789',
        password: 'secret',
      }),
    ]);

    const result = await listStudents({ userService });
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      id: expect.any(String),
      name: 'Viviana Perez',
      email: 'viviana@example.com',
      phoneNumber: '123456789',
      status: 'ACTIVE',
      role: Role.USER,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
