import type { ClassDeps } from "./createClass.js";

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
