const oneMinute = 60 * 1000;
const oneHour = oneMinute * 60;

export const minutes = {
  one: oneMinute,
  fifteen: oneMinute * 15,
};

export const hours = {
  one: oneHour,
  two: oneHour * 2,
};

export const days = {
  one: hours.one * 24,
};

export const weeks = {
  one: days.one * 7,
};
