import { FC, memo, ReactNode } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

type ImportExportButtonProps = {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
};

const ImportExportButton: FC<ImportExportButtonProps> = memo(
  ({ children, onPress, style }) => {
    const { t } = useTheme();

    return (
      <Pressable onPress={onPress} style={[style]}>
        <View style={[t.bgButton, t.pY6, t.roundedXl]}>
          <Text style={[t.textButton, t.fontSemibold, t.textCenter, t.textXl]}>
            {children}
          </Text>
        </View>
      </Pressable>
    );
  },
);

ImportExportButton.displayName = 'ImportExportButton';

export { ImportExportButton };
