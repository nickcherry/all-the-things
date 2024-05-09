import {
  Dispatch,
  FC,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { LocationInput } from '~/component/item/form/due/LocationInput';
import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { defaultDateNotificationTime } from '~/constant/notification';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { SetBottomSheetContent } from '~/type/bottomSheet';
import {
  isDueByDateRecurring,
  isDueByTimeRecurring,
  isDueWheneverRecurring,
  ItemDue,
  ItemDueRecurring,
  ItemDueType,
  ItemNotificationOffsetInDays,
  ItemNotificationOffsetInMinutes,
  Location,
} from '~/type/item';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { getDateNotificationTime } from '~/util/item/getDateNotificationTime';
import { getDueDate } from '~/util/item/getDueDate';
import { getDueNotifications } from '~/util/item/getDueNotifications';
import { getDueRecurring } from '~/util/item/getDueRecurring';
import { getDueTime } from '~/util/item/getDueTime';
import { getLocation } from '~/util/item/getLocation';
import { getNotificationOffsetInDays } from '~/util/item/getNotificationOffsetInDays';
import { getNotificationOffsetInMinutes } from '~/util/item/getNotificationOffsetInMinutes';
import { getSelectedOption } from '~/util/settings/getSelectedOption';
import { translateOptions } from '~/util/translation/translateOptions';

import { DateInput } from './DateInput';
import { DateInputBottomSheetContent } from './DateInputBottomSheetContent';
import { DateNotificationTimeInput } from './DateNotificationTimeInput';
import { NotificationsEnabledInput } from './NotificationsEnabledInput';
import { OffsetInDaysInput } from './OffsetInDaysInput';
import { OffsetInMinutesInput } from './OffsetInMinutesInput';
import { RecurringInput } from './RecurringInput';
import { TimeInput } from './TimeInput';
import { TimeInputBottomSheetContent } from './TimeInputBottomSheetContent';

const typeOptions = translateOptions('due', ['whenever', 'by_date', 'by_time']);
const fallbackIndex = 0;

type DueInputProps = {
  due: ItemDue;
  setBottomSheetContent: SetBottomSheetContent;
  setDue: Dispatch<SetStateAction<ItemDue>>;
  style?: ViewStyle | ViewStyle[];
};

const DueInput: FC<DueInputProps> = memo(
  ({ due, setBottomSheetContent, setDue, style }) => {
    const { scheme, t } = useTheme();
    const { settings } = useSettings();

    const date = useMemo(() => getDueDate({ due }), [due]);
    const time = useMemo(() => getDueTime({ due }), [due]);
    const recurring = useMemo(() => getDueRecurring({ due }), [due]);
    const notifications = useMemo(() => getDueNotifications({ due }), [due]);
    const offsetInDays = useMemo(
      () => getNotificationOffsetInDays({ due }),
      [due],
    );
    const offsetInMinutes = useMemo(
      () => getNotificationOffsetInMinutes({ due }),
      [due],
    );

    const dateNotificationTime = useMemo(
      () => new Date(getDateNotificationTime({ due, settings })),
      [due, settings],
    );

    const location = useMemo(() => getLocation({ due }), [due]);

    const setType = useCallback(
      (nextType: ItemDueType) =>
        setDue((prevDue) => {
          if (nextType === 'whenever') {
            return {
              ...prevDue,
              type: nextType,
              notifications: { enabled: false },
              recurring: isDueWheneverRecurring(recurring)
                ? recurring
                : { type: 'never' },
            };
          } else if (nextType === 'by_date') {
            return {
              ...prevDue,
              type: nextType,
              date: date.valueOf(),
              notifications: settings.defaultNotificationsEnabled
                ? {
                    enabled: true,
                    offsetInDays,
                    notificationTime:
                      (prevDue.type === 'by_date' &&
                        prevDue.notifications.enabled &&
                        prevDue.notifications.notificationTime) ||
                      defaultDateNotificationTime,
                    location,
                  }
                : { enabled: false },
              recurring: isDueByDateRecurring(recurring)
                ? recurring
                : { type: 'never' },
            };
          } else if (nextType === 'by_time') {
            return {
              ...prevDue,
              type: nextType,
              time: time.valueOf(),
              notifications: settings.defaultNotificationsEnabled
                ? { enabled: true, offsetInMinutes, location }
                : { enabled: false },
              recurring: isDueByTimeRecurring(recurring)
                ? recurring
                : { type: 'never' },
            };
          } else {
            throw new Error(`Unexpected type: ${nextType}`);
          }
        }),
      [
        date,
        location,
        offsetInDays,
        offsetInMinutes,
        recurring,
        setDue,
        settings.defaultNotificationsEnabled,
        time,
      ],
    );

    const setDate = useCallback(
      (nextDate: Date) =>
        setDue((prevDue) => {
          if (prevDue.type === 'by_date') {
            return { ...prevDue, date: nextDate.valueOf() };
          }

          return prevDue;
        }),
      [setDue],
    );

    const setTime = useCallback(
      (nextTime: Date) =>
        setDue((prevDue) => {
          if (prevDue.type === 'by_time') {
            return {
              ...prevDue,
              time: nextTime.valueOf(),
            };
          }

          return prevDue;
        }),
      [setDue],
    );

    const setNotificationsEnabled = useCallback(
      (nextNotificationsEnabled: boolean) =>
        setDue((prevDue) => {
          if (prevDue.type === 'whenever') {
            return {
              ...prevDue,
              notifications: nextNotificationsEnabled
                ? { ...notifications, enabled: true, location }
                : { ...notifications, enabled: false },
            };
          } else if (prevDue.type === 'by_date') {
            return {
              ...prevDue,
              notifications: nextNotificationsEnabled
                ? {
                    ...notifications,
                    enabled: true,
                    offsetInDays,
                    notificationTime:
                      (prevDue.type === 'by_date' &&
                        prevDue.notifications.enabled &&
                        prevDue.notifications.notificationTime) ||
                      defaultDateNotificationTime,
                    location,
                  }
                : { ...notifications, enabled: false },
            };
          } else if (prevDue.type === 'by_time') {
            return {
              ...prevDue,
              notifications: nextNotificationsEnabled
                ? { ...notifications, enabled: true, offsetInMinutes, location }
                : { ...notifications, enabled: false },
            };
          }

          return prevDue;
        }),
      [location, notifications, offsetInDays, offsetInMinutes, setDue],
    );

    const setOffsetInDays = useCallback(
      (nextOffsetInDays: ItemNotificationOffsetInDays) =>
        setDue((prevDue) => {
          if (prevDue.type === 'by_date' && prevDue.notifications.enabled) {
            return {
              ...prevDue,
              notifications: {
                ...notifications,
                offsetInDays: nextOffsetInDays,
                notificationTime:
                  (prevDue.notifications.enabled &&
                    prevDue.notifications.notificationTime) ||
                  defaultDateNotificationTime,
              },
            };
          }

          return prevDue;
        }),
      [notifications, setDue],
    );

    const setOffsetInMinutes = useCallback(
      (nextOffsetInMinutes: ItemNotificationOffsetInMinutes) =>
        setDue((prevDue) => {
          if (prevDue.type === 'by_time' && prevDue.notifications.enabled) {
            return {
              ...prevDue,
              notifications: {
                ...notifications,
                offsetInMinutes: nextOffsetInMinutes,
              },
            };
          }

          return prevDue;
        }),
      [notifications, setDue],
    );

    const setDateNotificationTime = useCallback(
      (nextDateNotificationTime: Date) =>
        setDue((prevDue) => {
          if (prevDue.type === 'by_date') {
            return {
              ...prevDue,
              notifications: {
                ...prevDue.notifications,
                notificationTime: nextDateNotificationTime.valueOf(),
              },
            };
          }

          return prevDue;
        }),
      [setDue],
    );

    const setRecurring = useCallback(
      (nextRecurring: ItemDueRecurring) =>
        setDue((prevDue) => {
          if (
            prevDue.type === 'whenever' &&
            isDueWheneverRecurring(nextRecurring)
          ) {
            return { ...prevDue, recurring: nextRecurring };
          } else if (
            prevDue.type === 'by_date' &&
            isDueByDateRecurring(nextRecurring)
          ) {
            return { ...prevDue, recurring: nextRecurring };
          } else if (
            prevDue.type === 'by_time' &&
            isDueByTimeRecurring(nextRecurring)
          ) {
            return { ...prevDue, recurring: nextRecurring };
          }

          return prevDue;
        }),
      [setDue],
    );

    const setLocation = useCallback(
      (nextLocation: Location | undefined) =>
        setDue((prevDue) => {
          return {
            ...prevDue,
            notifications: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(prevDue.notifications as any),
              location: nextLocation,
            },
          };
        }),
      [setDue],
    );

    const onDueTypePress = useCallback(() => {
      showActionSheet({
        options: typeOptions,
        onSelect: (value) => {
          setType(value);

          switch (value) {
            case 'by_date':
              return setBottomSheetContent({
                content: (
                  <DateInputBottomSheetContent date={date} setDate={setDate} />
                ),
              });
            case 'by_time':
              return setBottomSheetContent({
                content: (
                  <TimeInputBottomSheetContent time={time} setTime={setTime} />
                ),
              });
          }
        },
        scheme,
      });
    }, [date, time, scheme, setBottomSheetContent, setDate, setTime, setType]);

    const dueTypeTapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onDueTypePress)();
      });

    const recurringInput = useMemo(
      () => (
        <RecurringInput
          key="recurring"
          due={due}
          recurring={recurring}
          setRecurring={setRecurring}
          type={due.type}
        />
      ),
      [due, recurring, setRecurring],
    );

    const dateInput = useMemo(
      () => (
        <DateInput
          key="date"
          date={date}
          setDate={setDate}
          setBottomSheetContent={setBottomSheetContent}
        />
      ),
      [date, setBottomSheetContent, setDate],
    );

    const timeInput = useMemo(
      () => (
        <TimeInput
          key="time"
          time={time}
          setBottomSheetContent={setBottomSheetContent}
          setTime={setTime}
        />
      ),
      [time, setBottomSheetContent, setTime],
    );

    const notificationsEnabledInput = useMemo(
      () => (
        <NotificationsEnabledInput
          key="notificationsEnabled"
          notificationsEnabled={notifications.enabled}
          setNotificationsEnabled={setNotificationsEnabled}
        />
      ),
      [notifications.enabled, setNotificationsEnabled],
    );

    const notificationTimeInput = useMemo(
      () => (
        <DateNotificationTimeInput
          key="notificationTimeInput"
          notificationTime={dateNotificationTime}
          setNotificationTime={setDateNotificationTime}
          setBottomSheetContent={setBottomSheetContent}
        />
      ),
      [dateNotificationTime, setBottomSheetContent, setDateNotificationTime],
    );

    const offsetInMinutesInput = useMemo(
      () => (
        <OffsetInMinutesInput
          key="offsetInMinutes"
          offsetInMinutes={offsetInMinutes}
          setOffsetInMinutes={setOffsetInMinutes}
        />
      ),
      [offsetInMinutes, setOffsetInMinutes],
    );

    const offsetInDaysInput = useMemo(
      () => (
        <OffsetInDaysInput
          key="offsetInDays"
          offsetInDays={offsetInDays}
          setOffsetInDays={setOffsetInDays}
        />
      ),
      [offsetInDays, setOffsetInDays],
    );

    const locationInput = useMemo(
      () => (
        <LocationInput
          key="location"
          location={location}
          setLocation={setLocation}
        />
      ),
      [location, setLocation],
    );

    const secondaryFields: ReactNode = useMemo(() => {
      switch (due.type) {
        case 'whenever':
          return [
            recurringInput,
            notificationsEnabledInput,
            notifications.enabled ? locationInput : null,
          ];
        case 'by_date':
          return [
            dateInput,
            recurringInput,
            notificationsEnabledInput,
            notifications.enabled ? offsetInDaysInput : null,
            notifications.enabled ? notificationTimeInput : null,
            notifications.enabled ? locationInput : null,
          ];
        case 'by_time':
          return [
            timeInput,
            recurringInput,
            notificationsEnabledInput,
            notifications.enabled ? offsetInMinutesInput : null,
            notifications.enabled ? locationInput : null,
          ];
        default:
          return null;
      }
    }, [
      due.type,
      recurringInput,
      dateInput,
      notificationsEnabledInput,
      notifications.enabled,
      offsetInDaysInput,
      notificationTimeInput,
      locationInput,
      timeInput,
      offsetInMinutesInput,
    ]);

    return (
      <View style={style}>
        <ItemField
          label="Due"
          style={[t.mT5]}
          value={
            <GestureDetector gesture={dueTypeTapGesture}>
              <Text>
                {
                  useMemo(
                    () =>
                      getSelectedOption({
                        options: typeOptions,
                        selectedValue: due.type,
                        fallbackIndex,
                      }),
                    [due.type],
                  ).label
                }
              </Text>
            </GestureDetector>
          }
        />
        {secondaryFields}
      </View>
    );
  },
);

DueInput.displayName = 'DueInput';

export { DueInput };
