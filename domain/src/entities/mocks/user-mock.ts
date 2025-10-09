import { role, userStatus, type User } from '../user.js';
import { faker } from '@faker-js/faker';
import generateTimestamps from '../../utils/generateTimestamps.js';

export function userMock(opts?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.lorem.paragraph({ min: 8, max: 50 }),
    status: faker.helpers.arrayElement(Object.values(userStatus)),
    role: faker.helpers.arrayElement(Object.values(role)),
    ...generateTimestamps(),
    ...opts,
  };
}
