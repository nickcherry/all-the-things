import { getOrdinalSuffix } from '~/util/date/getOrdinalSuffix';

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
} as Record<number, string>;

function formatDateAbsolute({
  date,
  now = new Date(),
}: {
  date: Date;
  now?: Date;
}) {
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let output = `${month} ${day}${getOrdinalSuffix(day)}`;

  if (year !== now.getFullYear()) {
    output += `, ${year}`;
  }

  return output;
}

export { formatDateAbsolute };
