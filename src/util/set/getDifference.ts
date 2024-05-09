function getDifference<T>(a: Set<T>, b: Set<T>) {
  const diff = new Set<unknown>();

  for (const item of a) {
    if (!b.has(item)) {
      diff.add(item);
    }
  }

  for (const item of b) {
    if (!a.has(item)) {
      diff.add(item);
    }
  }

  return Array.from(diff);
}

export { getDifference };
