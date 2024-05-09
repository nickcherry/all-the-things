const MS_PER_Dy = 1000 * 60 * 60 * 24;

function getDistanceInDays(a: Date, b: Date): number {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_Dy);
}

export { getDistanceInDays };
