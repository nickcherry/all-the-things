import * as Application from 'expo-application';
import * as Notifications from 'expo-notifications';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { AppState, ScrollView, View } from 'react-native';

import { Subheading } from '~/component/text/Subheading';
import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { useBottomSheet } from '~/hook/bottomsheet/useBottomSheet';
import { useNavigateToNestedStackScreen } from '~/hook/navigation/useNavigateToNestedStackScreen';

import { AnalyticsEnabledInput } from './AnalyticsEnabledInput';
import { CleanUpAfterCompletedInput } from './CleanUpAfterCompletedInput';
import { ColorSchemeInput } from './ColorSchemeInput';
import { DefaultDateNotificationTimeInput } from './DefaultDateNotificationTimeInput';
import { DefaultNotificationsEnabledInput } from './DefaultNotificationsEnabledInput';
import { DefaultPriorityInput } from './DefaultPriorityInput';
import { ExportLink } from './ExportLink';
import { ImportLink } from './ImportLink';
import { RolloverTimeInput } from './RolloverTimeInput';

const SettingsForm: FC = memo(() => {
  const { t } = useTheme();
  const { bottomSheet, setBottomSheetContent } = useBottomSheet();
  const navigate = useNavigateToNestedStackScreen();

  const [notificationPermissions, setNotificationPermissions] =
    useState<Notifications.NotificationPermissionsStatus>();

  const syncCanSendNotifications = useCallback(async () => {
    setNotificationPermissions(await Notifications.getPermissionsAsync());
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      syncCanSendNotifications,
    );
    syncCanSendNotifications();

    return () => {
      subscription.remove();
    };
  }, [syncCanSendNotifications]);

  return (
    <>
      <ScrollView
        style={[t.hFull, t.pX4, t.pY1]}
        contentContainerStyle={[t.flex1, t.justifyBetween]}
      >
        <View>
          <Subheading>Appearance</Subheading>
          <ColorSchemeInput />
          <Subheading style={[t.mT6]}>Priority</Subheading>
          <DefaultPriorityInput />
          <Subheading style={[t.mT6]}>Recurring</Subheading>
          <RolloverTimeInput setBottomSheetContent={setBottomSheetContent} />
          <Subheading style={[t.mT6]}>Cleanup</Subheading>
          <CleanUpAfterCompletedInput />
          {notificationPermissions === undefined ? null : (
            <>
              <Subheading style={[t.mT6]}>Notifications</Subheading>
              {notificationPermissions.granted ? (
                <>
                  <DefaultNotificationsEnabledInput
                    syncCanSendNotifications={syncCanSendNotifications}
                  />
                  <DefaultDateNotificationTimeInput
                    setBottomSheetContent={setBottomSheetContent}
                    style={[t.mT4]}
                  />
                </>
              ) : (
                <Text>
                  To receive push notifications, you need to enable them in
                  system settings.
                </Text>
              )}
            </>
          )}
          <Subheading style={[t.mT6]}>Analytics</Subheading>
          <AnalyticsEnabledInput />
          <Subheading style={[t.mT6]}>App data</Subheading>
          <ImportLink />
          <ExportLink style={[t.mT4]} />
        </View>
        <Text
          suppressHighlighting
          style={[t.textMuted, t.pT2, { fontSize: 11 }]}
          onLongPress={() => {
            navigate('Debug', {});
          }}
        >
          v{Application.nativeApplicationVersion} (
          {Application.nativeBuildVersion}.0)
        </Text>
      </ScrollView>
      {bottomSheet}
    </>
  );
});

SettingsForm.displayName = 'SettingsForm';

export { SettingsForm };
