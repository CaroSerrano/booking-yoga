import type { Class } from '../../entities/class.js';
import type { ClassService } from '../class-service.js';

export class MockedClassService implements ClassService {
  classes: Class[] = [];

  constructor(classes: Class[]) {
    this.classes = classes;
  }

  updateOne = async (id: string, data: Partial<Class>) => {
    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    this.classes[index] = { ...this.classes[index], ...data };
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
  findByStartDate = async (date: Date) => {
    return this.classes.filter(
      (c) =>
        c.start.toISOString().split('T')[0] == date.toISOString().split('T')[0]
    );
  };
  findByLocation = async (location: string) => {
    return this.classes.filter((c) => c.location === location);
  };
  findByTitle = async (title: string) => {
    return this.classes.filter((c) => c.title === title);
  };
  findByTeacher = async (teacherId: string) => {
    return this.classes.filter((c) => c.teacher === teacherId);
  };
  delete = async (id: string) => {
    this.classes = this.classes.filter((c) => c.id !== id);
  };
}
