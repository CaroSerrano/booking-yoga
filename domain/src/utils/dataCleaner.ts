export function dataCleaner<T extends object>(
  rawData: T
): {
  [K in keyof T as T[K] extends undefined | null ? never : K]: Exclude<
    T[K],
    undefined | null
  >;
} {
  return Object.fromEntries(
    Object.entries(rawData as Record<string, unknown>).filter(
      ([, v]) => v !== undefined && v !== null
    )
  ) as any;
}
