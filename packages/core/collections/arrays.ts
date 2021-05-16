export function filterMap<T, U>(
  values: T[],
  fn: (value: T, index: number) => U | undefined | null,
): U[];
export function filterMap<T, U>(
  values: T[] | null | undefined,
  fn: (value: T, index: number) => U | undefined | null,
): U[] | null | undefined;
export function filterMap<T, U>(
  values: T[] | null | undefined,
  fn: (value: T, index: number) => U | undefined | null,
): U[] | null | undefined {
  if (values == null) {
    return values;
  }

  const result: U[] = [];
  for (let i = 0; i < values.length; i++) {
    const mapped = fn(values[i], i);
    if (mapped != null) {
      result.push(mapped);
    }
  }
  return result;
}
