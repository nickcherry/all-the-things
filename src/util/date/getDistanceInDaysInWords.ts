import lodashCapitalize from 'lodash/capitalize';

function getDistanceInDaysInWords({
  capitalize,
  distance,
}: {
  capitalize?: boolean;
  distance: number;
}) {
  const words = (() => {
    if (distance === 0) {
      return 'today';
    }

    if (distance === 1) {
      return 'tomorrow';
    }

    if (distance === -1) {
      return 'yesterday';
    }

    if (distance > 0) {
      return `in ${distance} days`;
    }

    return `${-distance} days ago`;
  })();

  return capitalize ? lodashCapitalize(words) : words;
}

export { getDistanceInDaysInWords };
