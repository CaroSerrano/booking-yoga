import type { Class } from '../entities/class.js';
import type { Service } from '../utils/types/services.js';

export interface ClassService extends Service<Class> {
  findAvailable: () => Promise<Class[]>;
  findByStartDate: (date: Date) => Promise<Class[]>;
  findByTitle: (title: string) => Promise<Class[]>;
  findByLocation: (location: string) => Promise<Class[]>;
  findByTeacher: (teacherId: string) => Promise<Class[]>;
}
