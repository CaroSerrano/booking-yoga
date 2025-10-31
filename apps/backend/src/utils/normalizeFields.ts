export function normalizeFields(
  fields: Record<string, string | string[] | undefined>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [
      k,
      Array.isArray(v) ? v[0] : v ?? '',
    ])
  ) as Record<string, string>;
}
