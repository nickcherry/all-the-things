import { FC, memo, ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

type ListEmptyProps = {
  children: ReactNode;
};

const ListEmpty: FC<ListEmptyProps> = memo(({ children }) => {
  const { t } = useTheme();

  return (
    <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
      <View
        style={[
          t.bgList,
          t.pX6,
          t.pY4,
          t.rounded2xl,
          {
            shadowColor: 'black',
            shadowOffset: 4,
            shadowOpacity: 0.05,
            shadowRadius: 4,
          },
        ]}
      >
        {typeof children === 'string' ? (
          <Text style={[t.textCenter]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
});

ListEmpty.displayName = 'ListEmpty';

export { ListEmpty };
