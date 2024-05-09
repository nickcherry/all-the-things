import { Entypo } from '@expo/vector-icons';
import { FC, memo } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { useTheme } from '~/context/ThemeProvider';
import { usePush } from '~/hook/navigation/usePush';

import { SettingsField } from './SettingsField';

type ImportLinkProps = {
  style?: ViewStyle | ViewStyle[];
};

const ImportLink: FC<ImportLinkProps> = memo(({ style }) => {
  const { t } = useTheme();
  const push = usePush();

  return (
    <Pressable
      onPress={() => {
        push('ImportData', {});
      }}
    >
      <SettingsField
        style={style}
        label="Import data"
        value={<Entypo name="chevron-right" size={22} style={[t.textMuted]} />}
      />
    </Pressable>
  );
});

ImportLink.displayName = 'ImportLink';

export { ImportLink };
