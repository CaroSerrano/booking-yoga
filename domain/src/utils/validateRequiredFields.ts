import { ValidationError } from "./customErrors.js";

export function validateRequiredFields<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[]
): void {
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new ValidationError(`${String(field)} is required`);
    }
  }
}