import { formatDateAbsolute } from '~/util/date/formatDateAbsolute';

function formatDateTimeAbsolute({ date }: { date: Date }) {
  return `${formatDateAbsolute({ date })} ${date.toLocaleTimeString()}`;
}

export { formatDateTimeAbsolute };
