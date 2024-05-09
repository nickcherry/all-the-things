import lodashCapitalize from 'lodash/capitalize';

function formatTime({
  capitalize,
  time,
}: {
  capitalize?: boolean;
  time: Date;
}) {
  let formattedTime = time
    .toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })
    .toLowerCase()
    .replace(' ', ' ') // In the Hermes environment, `toLocaleTimeString seems to return a white-space-looking character instead of an actual space. Replace it with a space.
    .replace(' ', '')
    .replace(':00', '');

  if (formattedTime === '12am') {
    formattedTime = 'midnight';
  }

  if (formattedTime === '12pm') {
    formattedTime = 'noon';
  }

  return capitalize ? lodashCapitalize(formattedTime) : formattedTime;
}

export { formatTime };
