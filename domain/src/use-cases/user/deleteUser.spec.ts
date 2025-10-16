import { describe, expect, test } from 'vitest';
import { MockedUserService } from '../../services/mocks/mock-user-service';
import { userMock } from '../../entities/mocks/user-mock';
import { getUserByEmail } from './getUsers';
import { deleteUser } from './deleteUser';

describe('Delete user', () => {
  test('A user is successfully deleted and no longer retrievable by ID.', async () => {
    const userService = new MockedUserService([
      userMock({
        name: 'Carolina Serrano',
        email: 'caroserrano@example.com',
        phoneNumber: '123456789',
        password: 'secret',
      }),
    ]);
    const userToDelete = await getUserByEmail(
      { userService },
      { email: 'caroserrano@example.com' }
    );
    await deleteUser({ userService }, { id: userToDelete.id });
    expect(userService.users).toHaveLength(0);
    await expect(() => getUserByEmail(
      { userService },
      { email: 'caroserrano@example.com' }
    )).rejects.toThrow('user not found');
  });
});
