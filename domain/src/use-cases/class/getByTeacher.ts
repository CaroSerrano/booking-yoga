import { ClassDeps } from "./createClass";

interface GetByTeacherPayload {
  teacher: string;
}

export async function getByTeacher(
  { classService }: ClassDeps,
  { teacher }: GetByTeacherPayload
) {
  const classes = await classService.findByTeacher(teacher);
  return classes;
}
