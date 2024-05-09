import { Entypo } from '@expo/vector-icons';
import { FC, memo } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { useTheme } from '~/context/ThemeProvider';
import { usePush } from '~/hook/navigation/usePush';

import { SettingsField } from './SettingsField';

type ExportLinkProps = {
  style?: ViewStyle | ViewStyle[];
};

const ExportLink: FC<ExportLinkProps> = memo(({ style }) => {
  const { t } = useTheme();
  const push = usePush();

  return (
    <Pressable
      onPress={() => {
        push('ExportData', {});
      }}
    >
      <SettingsField
        style={style}
        label="Export data"
        value={<Entypo name="chevron-right" size={22} style={[t.textMuted]} />}
      />
    </Pressable>
  );
});

ExportLink.displayName = 'ExportLink';

export { ExportLink };
