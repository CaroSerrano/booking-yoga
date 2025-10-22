import { describe, test, expect } from 'vitest';
import { userMock } from '../../entities/mocks/user-mock.js';
import { Role, UserStatus } from '../../entities/index.js';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { updateUserData } from './updateUser.js';

describe('Update user', () => {
  test('when user data is updated, should return the updated user', async () => {
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

    const userFound = await userService.findByEmail('caroserrano@example.com');
    if (!userFound) throw new Error('user not found in test setup');
    const { password, ...safeUser } = userFound;

    const result = await updateUserData(
      { userService },
      { id: userFound.id, phoneNumber: '6548465' }
    );

    expect(result).toStrictEqual({
      ...safeUser,
      phoneNumber: '6548465',
    });
  });

  test('if user does not exist, an error is expected', async () => {
    const userService = new MockedUserService([]);
    await expect(
      updateUserData({ userService }, { id: 'non-existent' })
    ).rejects.toThrow('User not found');
  });
});
