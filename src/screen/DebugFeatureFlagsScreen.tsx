import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { Text } from '~/component/text/Text';
import { defaultFeatureFlags } from '~/context/FeatureFlagProvider';
import { useTheme } from '~/context/ThemeProvider';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type DebugFeatureFlagsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DebugFeatureFlags'
>;

const DebugFeatureFlagsScreen = buildScreen<DebugFeatureFlagsScreenProps>(
  {
    insetTop: false,
    insetBottom: true,
  },
  () => {
    const { t } = useTheme();
    // const { featureFlags } = useFeatureFlags();

    if (Object.keys(defaultFeatureFlags).length === 0) {
      return (
        <View style={[t.justifyStart, t.itemsCenter, t.p4]}>
          <Text>There are no active feature flags.</Text>
        </View>
      );
    }

    return (
      <View style={[t.pX4]}>
        {/* <FormField
          label="Location alerts"
          value={
            <Switch
              value={featureFlags.locationAlertsEnabled}
              onValueChange={(locationAlertsEnabled) =>
                updateFeatureFlags({ locationAlertsEnabled })
              }
            />
          }
        /> */}
      </View>
    );
  },
);

DebugFeatureFlagsScreen.displayName = 'DebugFeatureFlagsScreen';

export { DebugFeatureFlagsScreen };
