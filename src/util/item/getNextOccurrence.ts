const maxIncrementCount = 100;

function getNextOccurrence({
  doesMatch,
  increment,
  now,
}: {
  doesMatch: (date: number) => boolean;
  increment: number;
  now: number;
}): number {
  let incrementCount = 0;
  let nextDate = now;

  while (!doesMatch(nextDate)) {
    nextDate += increment;

    if (incrementCount++ > maxIncrementCount) {
      throw new Error('getNextOccurrence increments exceeded max count');
    }
  }

  return nextDate;
}

export { getNextOccurrence };
