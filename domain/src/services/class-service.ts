import type { Class } from "../entities/class.js";
import type { Service } from "../utils/types/services.js";

export interface ClassService extends Service<Class> {
  findByStartDate: (date: Date) => Promise<Class[] | undefined>;
  findByTitle: (title: string) => Promise<Class[] | undefined>;
  findByLocation: (location: string) => Promise<Class[] | undefined>;
  findByTeacher: (teacherId: string) => Promise<Class[] | undefined>;
}