import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Application from 'expo-application';
import * as Notifications from 'expo-notifications';
import * as Updates from 'expo-updates';
import { FC, memo, ReactNode, useEffect, useState } from 'react';
import {
  Alert,
  NativeModules,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { FormField } from '~/component/field/FormField';
import { FullscreenLoader } from '~/component/loader/FullscreenLoader';
import { Text } from '~/component/text/Text';
import { env, isDev } from '~/constant/env';
import { itemCateogryId, notificationSound } from '~/constant/notification';
import { defaultHitSlop } from '~/constant/pressable';
import { useTheme } from '~/context/ThemeProvider';
import { usePush } from '~/hook/navigation/usePush';
import { RootStackParamList } from '~/type/navigation';
import { formatDateTimeAbsolute } from '~/util/date/formatDateTimeAbsolute';
import { requestPushNotificationPermission } from '~/util/notification/requestPushNotificationPermission';
import { buildScreen } from '~/util/screen/buildScreen';
import { storage } from '~/util/storage';

const currentBuildIcon = '🐩';

type DebugScreenProps = NativeStackScreenProps<RootStackParamList, 'Debug'>;

type BuildInfo = {
  installedAt: Date;
  nativeApplicationVersion: string;
  nativeBuildVersion: string;
  releaseChannel: string;
  runtimeVersion: string;
  updateId: string;
};

const DebugScreen = buildScreen<DebugScreenProps>(
  {
    insetTop: false,
    insetBottom: true,
  },
  () => {
    const { t } = useTheme();
    const push = usePush();

    const [buildInfo, setBuildInfo] = useState<BuildInfo>();

    useEffect(() => {
      const init = async () => {
        setBuildInfo({
          installedAt: await Application.getInstallationTimeAsync(),
          nativeApplicationVersion: Application.nativeApplicationVersion || '–',
          nativeBuildVersion: Application.nativeBuildVersion || '–',
          releaseChannel: Updates.releaseChannel || '–',
          runtimeVersion: Updates.runtimeVersion || '–',
          updateId: Updates.updateId || '–',
        });
      };

      init();
    }, []);

    if (!buildInfo) {
      return <FullscreenLoader />;
    }

    return (
      <ScrollView style={[t.p4]} overScrollMode="never" bounces={false}>
        <DebugAction
          onPress={() => {
            push('DebugItems', {});
          }}
        >
          Items
        </DebugAction>
        <DebugAction
          onPress={() => {
            push('DebugFeatureFlags', {});
          }}
        >
          Feature flags
        </DebugAction>
        <DebugAction
          onPress={() => {
            push('DebugNotifications', {});
          }}
        >
          Notifications
        </DebugAction>
        <DebugAction
          onPress={async () => {
            const permissions = await requestPushNotificationPermission();

            if (!permissions?.granted) {
              Alert.alert(`Notification permission has not been granted`);
            } else {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Test Title',
                  subtitle: 'Test Subtitle',
                  body: 'Test Body',
                  categoryIdentifier: itemCateogryId,
                  sound: notificationSound,
                },
                trigger: {
                  seconds: 1,
                },
              });
            }
          }}
        >
          Send test notification
        </DebugAction>
        <DebugAction
          onPress={async () => {
            await Notifications.cancelAllScheduledNotificationsAsync();
            Alert.alert('Canceled all notifications');
          }}
        >
          Cancel native notifications
        </DebugAction>
        <DebugAction
          onPress={async () => {
            storage.clearAll();
            if (isDev) {
              NativeModules.DevSettings.reload();
            } else {
              await Updates.reloadAsync();
            }
          }}
        >
          Clear storage
        </DebugAction>
        <View style={[t.borderTHairline, t.borderDefault, t.pT8]}>
          <DebugField label="Environment" value={env || '–'} />
          <DebugField
            label="App version"
            value={buildInfo.nativeApplicationVersion}
          />
          <DebugField
            label="Build version"
            value={buildInfo.nativeBuildVersion}
          />
          <DebugField
            label="Runtime version"
            value={buildInfo.runtimeVersion}
          />
          <DebugField
            label="Release channel"
            value={buildInfo.releaseChannel}
          />
          <DebugField
            label="Installed on"
            value={formatDateTimeAbsolute({ date: buildInfo.installedAt })}
          />
          <DebugField
            label="Update id"
            value={[buildInfo.updateId, currentBuildIcon].join(' ')}
          />
        </View>
      </ScrollView>
    );
  },
);

DebugScreen.displayName = 'DebugScreen';

type DebugActionProps = {
  children: ReactNode;
  onPress: () => void;
};

const DebugAction: FC<DebugActionProps> = memo(({ children, onPress }) => {
  const { t } = useTheme();

  return (
    <Pressable hitSlop={defaultHitSlop} onPress={onPress}>
      <Text style={[t.mB8]}>{children}</Text>
    </Pressable>
  );
});

DebugAction.displayName = 'DebugAction';

type DebugFieldProps = {
  label: string;
  value: string;
};

const DebugField: FC<DebugFieldProps> = memo(({ label, value }) => {
  const { t } = useTheme();

  return (
    <FormField
      style={[t.mB2]}
      label={<Text style={[t.textMuted, t.textXs]}>{label}</Text>}
      value={<Text style={[t.textMuted, t.textXs]}>{value}</Text>}
    />
  );
});

export { DebugScreen };
