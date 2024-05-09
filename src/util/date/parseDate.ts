function parseDate({ date: dateString }: { date: string }): Date | null {
  if (!dateString) {
    return null;
  }

  const [month, day, year] = dateString.split('/').map(Number);

  if ([month, day, year].some((value) => Number.isNaN(value))) {
    return null;
  }

  if (year < 0 || month < 1 || day < 1) {
    return null;
  }

  if (year > 9999 || month > 12 || day > 31) {
    return null;
  }

  const date = new Date();
  date.setFullYear(year, month - 1, day);
  return date;
}

export { parseDate };
