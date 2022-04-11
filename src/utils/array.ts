export function ensureArray(arg: unknown) {
  return Array.isArray(arg) ? arg : [arg];
}
