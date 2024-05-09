import { StatusBar } from 'expo-status-bar';
import { FC, memo } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CountItemsAndLists } from '~/component/analytics/CountItemsAndLists';
import { FontLoader } from '~/component/font/FontLoader';
import { RescheduleItemNotifications } from '~/component/item/RescheduleItemNotifications';
import { Navigator } from '~/component/navigation/Navigator';
import { DisablePushNotificationsIfPermissionDenied } from '~/component/notification/DisablePushNotificationsIfPermissionDenied';
import { SyncColorScheme } from '~/component/theme/SyncColorScheme';
import { AnalyticsProvider } from '~/context/AnalyticsProvider';
import { DrawerProvider } from '~/context/DrawerProvider';
import { FeatureFlagProvider } from '~/context/FeatureFlagProvider';
import { ItemProvider } from '~/context/ItemProvider';
import { ListProvider } from '~/context/ListProvider';
import { NotificationProvider } from '~/context/NotificationProvider';
import { RestartProvider } from '~/context/RestartProvider';
import { SettingsProvider } from '~/context/SettingsProvider';
import { SplashProvider } from '~/context/SplashProvider';
import { ThemeProvider, useTheme } from '~/context/ThemeProvider';

const App: FC = memo(() => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
});

App.displayName = 'App';

const ThemedApp: FC = memo(() => {
  const { t } = useTheme();

  return (
    <SplashProvider>
      <StatusBar style="auto" />
      <RestartProvider>
        <FeatureFlagProvider>
          <SettingsProvider>
            {/* SyncColorScheme must be a child of ThemeProvider and SettingsProvider  */}
            <SyncColorScheme />
            <SafeAreaProvider>
              <GestureHandlerRootView style={[t.flex1]}>
                {/* AnalyticsProvider must be a child of SettingsProvider */}
                <AnalyticsProvider>
                  <View style={[t.flex1]}>
                    <FontLoader>
                      {/* DisablePushNotificationsIfPermissionDenied must be a child of SettingsProvider */}
                      <DisablePushNotificationsIfPermissionDenied />
                      <NotificationProvider>
                        <ListProvider>
                          {/* ItemProvider must be a child of SettingsProvider, NotificationProvider, and ListProvider */}
                          <ItemProvider>
                            <DrawerProvider>
                              {/* RescheduleItemNotifications must be a child of ItemProvider and NotificationProvider */}
                              <RescheduleItemNotifications />
                              {/* CountItemsAndLists must be a child of ItemProvider and ListProvider */}
                              <CountItemsAndLists />
                              <Navigator />
                            </DrawerProvider>
                          </ItemProvider>
                        </ListProvider>
                      </NotificationProvider>
                    </FontLoader>
                  </View>
                </AnalyticsProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </SettingsProvider>
        </FeatureFlagProvider>
      </RestartProvider>
    </SplashProvider>
  );
});

ThemedApp.displayName = 'ThemedApp';

export { App };
