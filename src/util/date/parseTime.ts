function parseTime({ time: timeString }: { time: string }): Date | null {
  if (!timeString) {
    return null;
  }

  const [hoursMinutesSeconds, amPm] = timeString.split(' ');
  const [hours, minutes] = hoursMinutesSeconds.split(':').map(Number);

  if (!amPm) {
    return null;
  }

  if ([hours, minutes].some((value) => Number.isNaN(value))) {
    return null;
  }

  const time = new Date();
  time.setHours(hours + (amPm === 'PM' ? 12 : 0), minutes, 0, 0);
  return time;
}

export { parseTime };
