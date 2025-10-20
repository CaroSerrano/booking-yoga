import type { Class } from '../../entities/class.js';
import type { Filters } from '../../use-cases/index.js';
import type { ClassService } from '../class-service.js';

export class MockedClassService implements ClassService {
  classes: Class[] = [];

  constructor(classes: Class[]) {
    this.classes = classes;
  }

  updateOne = async (id: string, data: Partial<Class>) => {
    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    this.classes[index] = { ...this.classes[index], ...data } as Class;
    return this.classes[index];
  };
  findAll = async () => {
    return this.classes;
  };
  findAvailable = async () => {
    return this.classes.filter((c) => c.end > new Date());
  };
  findById = async (id: string) => {
    return this.classes.find((c) => c.id == id);
  };
  save = async (data: Class) => {
    this.classes.push(data);
  };
  findByFilters = async (filters: Filters) => {
    return this.classes.filter((c) => {
      let match = true;

      if (filters.location) match &&= c.location === filters.location;

      if (filters.title)
        match &&= c.title.toLowerCase().includes(filters.title.toLowerCase());

      if (filters.teacherId) match &&= c.teacherId === filters.teacherId;

      if (filters.startDate)
        match &&=
          c.start.toISOString().split('T')[0] ===
          filters.startDate.toISOString().split('T')[0];

      return match;
    });
  };
  delete = async (id: string) => {
    this.classes = this.classes.filter((c) => c.id !== id);
  };
}
