import { formatDateAbsolute } from '~/util/date/formatDateAbsolute';

import { getDistanceInDays } from './getDistanceInDays';
import { getDistanceInDaysInWords } from './getDistanceInDaysInWords';

function formatDateRelative({
  capitalize = false,
  date,
}: {
  capitalize?: boolean;
  date: Date;
}) {
  const distance = getDistanceInDays(new Date(), date);

  if (distance > 7) {
    return formatDateAbsolute({ date });
  }

  return getDistanceInDaysInWords({ capitalize, distance });
}
export { formatDateRelative };
