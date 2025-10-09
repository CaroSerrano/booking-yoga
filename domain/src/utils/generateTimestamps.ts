import { faker } from "@faker-js/faker";

export default function generateTimestamps() {
  const createdAt = faker.date.past({ years: 1 });
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
  return { createdAt, updatedAt };
}