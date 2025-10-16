import { ClassDeps } from './createClass';

interface UpdatePayload {
  id: string;
  title?: string;
  description?: string;
  teacher?: string;
  totalSlots?: number;
  start?: string;
  end?: string;
  location?: string;
  address?: string;
}

export async function updateClass(
  { classService }: ClassDeps,
  payload: UpdatePayload
) {
  const { id, end, start, ...data } = payload;

  const updatedClass = await classService.updateOne(id, {
    ...data,
    ...(start !== undefined && { start: new Date(start) }),
    ...(end !== undefined && { end: new Date(end) }),
  });
  return updatedClass;
}
