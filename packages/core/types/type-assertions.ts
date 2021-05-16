export function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (!isDefined(value)) {
    throw new Error("Expected a value but got undefined");
  }
}

export function assertUnreachable(value: never, message: string): never {
  throw new Error(message);
}
