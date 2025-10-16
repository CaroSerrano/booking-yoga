import { faker } from '@faker-js/faker';
import { Class, ClassStatus } from '../class';
import generateTimestamps from '../../utils/generateTimestamps';

export function classMock(opts?: Partial<Class>): Class {
  const start = faker.date.soon({ days: 30 });
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  return {
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement([
      'Hatha Yoga',
      'Prenatal Yoga',
      'Meditation Session',
      'Workshop',
      'Private Hatha Yoga',
      'Private Prenatal Yoga',
      'Ayurvedic Massage',
      'Gentle yoga',
      'Kids yoga'
    ]),
    teacher: faker.string.uuid(),
    description: faker.lorem.sentence(),
    start,
    end,
    status: ClassStatus.SCHEDULE,
    location: faker.location.city(),
    address: faker.location.streetAddress(),
    totalSlots: faker.number.int({ min: 5, max: 20 }),
    ...generateTimestamps(),
    ...opts
  };
}
