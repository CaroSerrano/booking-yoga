import { describe, test, expect } from 'vitest';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';
import { login } from './login.js';

describe('Login', () => {
  test('returns user when credentials are valid', async () => {
    const userService = new MockedUserService([
      userMock({
        email: 'pablo@example.com',
        password: 'secret',
        name: 'Pablo Perez',
      }),
    ]);

    const result = await login(
      { userService },
      { email: 'pablo@example.com', pass: 'secret' }
    );

    expect(result).toBeDefined();
    expect(result.email).toBe('pablo@example.com');
    expect(result.name).toBe('Pablo Perez')
  });

  test('returns error when user not found', async () => {
    const userService = new MockedUserService([]);
    await expect(() =>
      login({ userService }, { email: 'none@example.com', pass: 'secret' })
    ).rejects.toThrow('User not found');
  });
});
