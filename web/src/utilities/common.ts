export function hasKey<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}

export function singletonTimeoutFactory() {
  let timeoutId: NodeJS.Timeout | undefined = undefined;

  return function setSingletonTimeout(callback: () => unknown, delay: number) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
    return timeoutId;
  };
}
