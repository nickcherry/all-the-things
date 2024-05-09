import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SettingsForm } from '~/component/settings/SettingsForm';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

const SettingsScreen = buildScreen<SettingsScreenProps>(
  { insetBottom: true },
  () => {
    return <SettingsForm />;
  },
);

SettingsScreen.displayName = 'SettingsScreen';

export { SettingsScreen };
