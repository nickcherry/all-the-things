import { days } from '~/constant/time';
import { ItemDue, ItemDueRecurringType } from '~/type/item';
import { Settings } from '~/type/settings';
import { getDueDate } from '~/util/item/getDueDate';
import { getNextOccurrence } from '~/util/item/getNextOccurrence';

type GetPrevRolloverTimeForPeriod = (params: {
  due: ItemDue;
  now: number;
  settings: Settings;
}) => number;

const getPrevDueDateFallback: GetPrevRolloverTimeForPeriod = ({ due }) => {
  if (due.type === 'by_time') {
    return due.time;
  } else if (due.type === 'by_date') {
    return due.date;
  } else {
    return new Date(8640000000000000).valueOf();
  }
};

const getPrevDueDateForDaily: GetPrevRolloverTimeForPeriod = ({
  now,
  settings,
}) => {
  const nowAsDate = new Date(now);
  const rolloverTimeAsDate = new Date(settings.recurringRolloverTime);

  const todaysRolloverTime = rolloverTimeAsDate.setFullYear(
    nowAsDate.getFullYear(),
    nowAsDate.getMonth(),
    nowAsDate.getDate(),
  );

  if (now > todaysRolloverTime) {
    return todaysRolloverTime;
  } else {
    return rolloverTimeAsDate.setFullYear(
      nowAsDate.getFullYear(),
      nowAsDate.getMonth(),
      nowAsDate.getDate() - 1,
    );
  }
};

const getPrevRolloverTimeForWeekly: GetPrevRolloverTimeForPeriod = ({
  due,
  now,
  settings,
}) => {
  const rolloverTimeAsDate = new Date(settings.recurringRolloverTime);
  const dayOfWeek = getDueDate({ due }).getDay();

  return new Date(
    getNextOccurrence({
      now,
      increment: -days.one,
      doesMatch: (date) => new Date(date).getDay() === dayOfWeek,
    }),
  ).setHours(
    rolloverTimeAsDate.getHours(),
    rolloverTimeAsDate.getMinutes(),
    rolloverTimeAsDate.getSeconds(),
    rolloverTimeAsDate.getMilliseconds(),
  );
};

const getPrevDueDateForMonthly: GetPrevRolloverTimeForPeriod = ({
  due,
  now,
}) => {
  const nowAsDate = new Date(now);
  const dueAsDate = getDueDate({ due });

  const nowDayOfMonth = nowAsDate.getDate();
  const dueDayOfMonth = dueAsDate.getDate();

  if (nowDayOfMonth > dueDayOfMonth) {
    return nowAsDate.setDate(dueDayOfMonth);
  } else {
    return new Date(
      new Date(nowAsDate).setMonth(nowAsDate.getMonth() - 1),
    ).setDate(dueDayOfMonth);
  }
};

const getPrevDueDateForYearly: GetPrevRolloverTimeForPeriod = ({
  due,
  now,
}) => {
  const nowAsDate = new Date(now);
  const dueAsDate = getDueDate({ due });

  const dueThisYear = dueAsDate.setFullYear(nowAsDate.getFullYear());

  if (now < dueThisYear) {
    return new Date(dueThisYear).setFullYear(nowAsDate.getFullYear() - 1);
  } else {
    return dueThisYear;
  }
};

const getPrevRolloverTimeForPeriod: Record<
  ItemDueRecurringType,
  GetPrevRolloverTimeForPeriod
> = {
  never: getPrevDueDateFallback,
  daily: getPrevDueDateForDaily,
  weekly: getPrevRolloverTimeForWeekly,
  monthly: getPrevDueDateForMonthly,
  yearly: getPrevDueDateForYearly,
};

const getPrevRolloverTime: GetPrevRolloverTimeForPeriod = ({
  due,
  now,
  settings,
}) => {
  const rolloverTimeAsDate = new Date(settings.recurringRolloverTime);

  return new Date(
    getPrevRolloverTimeForPeriod[due.recurring.type]({ due, now, settings }),
  ).setHours(
    rolloverTimeAsDate.getHours(),
    rolloverTimeAsDate.getMinutes(),
    rolloverTimeAsDate.getSeconds(),
    rolloverTimeAsDate.getMilliseconds(),
  );
};

export { getPrevRolloverTime };
