import type { ClassDeps } from "./createClass.js";

interface GetByTeacherPayload {
  teacherId: string;
}

export async function getClassByTeacher(
  { classService }: ClassDeps,
  { teacherId }: GetByTeacherPayload
) {
  const classes = await classService.findByTeacher(teacherId);
  return classes;
}
