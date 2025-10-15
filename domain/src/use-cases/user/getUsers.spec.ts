import { describe, expect, test } from 'vitest';
import { MockedUserService } from '../../services/mocks/mock-user-service';
import { userMock } from '../../entities/mocks/user-mock';
import { Role, UserStatus } from '../../entities';

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

    const result = await listAll()
    expect(result).toHaveLength(2)
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

    const result = await listActive()
    expect(result).toHaveLength(1)
  });
});
