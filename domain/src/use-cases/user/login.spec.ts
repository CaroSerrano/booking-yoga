import { describe, test, expect, vi } from 'vitest';
import { MockedUserService } from '../../services/mocks/mock-user-service.js';
import { userMock } from '../../entities/mocks/user-mock.js';
import { login } from './login.js';

describe('Login', () => {
  test('returns user if exists', async () => {
    const userService = new MockedUserService([
      userMock({
        email: 'pablo@example.com',
        password: 'secret',
        name: 'Pablo Perez',
      }),
    ]);
    const hasher = {
      hash: vi.fn().mockResolvedValue('hashed-pass'),
      compare: vi.fn().mockResolvedValue('secret'),
    };
    const result = await login(
      { userService, hasher },
      { email: 'pablo@example.com', pass: 'hashed-pass' }
    );

    expect(result).toBeDefined();
    expect(result.email).toBe('pablo@example.com');
    expect(result.name).toBe('Pablo Perez');
  });

  test('returns error when user not found', async () => {
    const userService = new MockedUserService([]);
    const hasher = {
      hash: vi.fn().mockResolvedValue('hashed-pass'),
      compare: vi.fn().mockResolvedValue('secret'),
    };
    await expect(() =>
      login(
        { userService, hasher },
        { email: 'none@example.com', pass: 'hashed-pass' }
      )
    ).rejects.toThrow('User not found');
  });
});
