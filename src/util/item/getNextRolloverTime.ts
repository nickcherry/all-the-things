import { days } from '~/constant/time';
import { ItemDueByDate, ItemDueRecurringType } from '~/type/item';
import { Settings } from '~/type/settings';
import { getNextOccurrence } from '~/util/item/getNextOccurrence';

type GetNextRolloverTimeForPeriod = (params: {
  due: ItemDueByDate;
  now: number;
  settings: Settings;
}) => number;

const getNextRolloverTimeFallback: GetNextRolloverTimeForPeriod = ({ due }) =>
  due.date;

const getNextDueDateForDaily: GetNextRolloverTimeForPeriod = ({
  now,
  settings,
}) => {
  const nowAsDate = new Date(now);
  const rolloverTimeAsDate = new Date(settings.recurringRolloverTime);

  const todaysDueTime = rolloverTimeAsDate.setFullYear(
    nowAsDate.getFullYear(),
    nowAsDate.getMonth(),
    nowAsDate.getDate(),
  );

  if (now > todaysDueTime) {
    return todaysDueTime;
  } else {
    return rolloverTimeAsDate.setFullYear(
      nowAsDate.getFullYear(),
      nowAsDate.getMonth(),
      nowAsDate.getDate() - 1,
    );
  }
};

const getNextRolloverTimeForWeekly: GetNextRolloverTimeForPeriod = ({
  due,
  now,
  settings,
}) => {
  const rolloverTimeAsDate = new Date(settings.recurringRolloverTime);
  const dayOfWeek = new Date(due.date).getDay();

  return new Date(
    getNextOccurrence({
      now,
      increment: days.one,
      doesMatch: (date) => new Date(date).getDay() === dayOfWeek,
    }),
  ).setHours(
    rolloverTimeAsDate.getHours(),
    rolloverTimeAsDate.getMinutes(),
    rolloverTimeAsDate.getSeconds(),
    rolloverTimeAsDate.getMilliseconds(),
  );
};

const getNextRolloverTimeForMonthly: GetNextRolloverTimeForPeriod = ({
  due,
  now,
}) => {
  const nowAsDate = new Date(now);
  const dueAsDate = new Date(due.date);

  const nowDayOfMonth = nowAsDate.getDate();
  const dueDayOfMonth = dueAsDate.getDate();

  if (nowDayOfMonth > dueDayOfMonth) {
    return new Date(nowAsDate.setMonth(nowAsDate.getMonth() + 1)).setDate(
      dueDayOfMonth,
    );
  } else {
    return new Date(nowAsDate).setDate(dueDayOfMonth);
  }
};

const getNextRolloverTimeForYearly: GetNextRolloverTimeForPeriod = ({
  due,
  now,
}) => {
  const nowAsDate = new Date(now);
  const dueAsDate = new Date(due.date);

  const dueThisYear = dueAsDate.setFullYear(nowAsDate.getFullYear());

  if (now < dueThisYear) {
    return dueThisYear;
  } else {
    return new Date(dueThisYear).setFullYear(nowAsDate.getFullYear() + 1);
  }
};

const getNextRolloverTimeForPeriod: Record<
  ItemDueRecurringType,
  GetNextRolloverTimeForPeriod
> = {
  never: getNextRolloverTimeFallback,
  daily: getNextDueDateForDaily,
  weekly: getNextRolloverTimeForWeekly,
  monthly: getNextRolloverTimeForMonthly,
  yearly: getNextRolloverTimeForYearly,
};

const getNextRolloverTime: GetNextRolloverTimeForPeriod = ({
  due,
  now,
  settings,
}) => {
  const rolloverTimeAsDate = new Date(settings.recurringRolloverTime);
  return new Date(
    getNextRolloverTimeForPeriod[due.recurring.type]({ due, now, settings }),
  ).setHours(
    rolloverTimeAsDate.getHours(),
    rolloverTimeAsDate.getMinutes(),
    rolloverTimeAsDate.getSeconds(),
    rolloverTimeAsDate.getMilliseconds(),
  );
};

export { getNextRolloverTime };
