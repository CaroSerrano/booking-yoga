import { ClassDeps } from './createClass';

interface GetByTitlePayload {
  title: string;
}

export async function getByTitle(
  { classService }: ClassDeps,
  { title }: GetByTitlePayload
) {
  const classes = await classService.findByTitle(title);
  return classes;
}
