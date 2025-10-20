import type { Class } from '../entities/class.js';
import type { Filters } from '../use-cases/index.js';
import type { Service } from '../utils/types/services.js';

export interface ClassService extends Service<Class> {
  findAvailable: () => Promise<Class[]>;
  findByFilters: (filters: Filters) => Promise<Class[]>;
}
