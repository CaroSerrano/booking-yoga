import { ClassDeps } from "./createClass";

interface GetByTeacherPayload {
  teacher: string;
}

export async function getClassByTeacher(
  { classService }: ClassDeps,
  { teacher }: GetByTeacherPayload
) {
  const classes = await classService.findByTeacher(teacher);
  return classes;
}
