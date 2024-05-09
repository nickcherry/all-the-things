import { Entypo } from '@expo/vector-icons';
import { FC, memo, useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { useHasUnmountedRef } from '~/hook/mount/useHasUnmountedRef';

const CreateFirstItemPrompt: FC = memo(() => {
  const { t } = useTheme();

  const translateY = useRef(new Animated.Value(0)).current;
  const hasUnmountedRef = useHasUnmountedRef();

  useEffect(() => {
    const bounce = () => {
      if (hasUnmountedRef.current) {
        return;
      }

      Animated.timing(translateY, {
        duration: 420,
        easing: Easing.in(Easing.quad),
        toValue: 12,
        useNativeDriver: true,
      }).start(() => {
        if (hasUnmountedRef.current) {
          return;
        }
        Animated.timing(translateY, {
          duration: 420,
          easing: Easing.out(Easing.quad),
          toValue: 0,
          useNativeDriver: true,
        }).start(bounce);
      });
    };

    bounce();
  }, [hasUnmountedRef, translateY]);

  return (
    <View
      style={[t.flex1, t.justifyEnd, t.itemsCenter, { paddingBottom: 120 }]}
    >
      <View
        style={[
          t.bgList,
          t.pX8,
          t.pY4,
          t.mB2,
          t.rounded2xl,
          {
            shadowColor: 'black',
            shadowOffset: 4,
            shadowOpacity: 0.05,
            shadowRadius: 4,
          },
        ]}
      >
        <Text>Create your first item</Text>
      </View>
      <Animated.View style={[{ transform: [{ translateY }] }]}>
        <Entypo
          name="arrow-down"
          size={54}
          style={[
            t.textDefault,
            {
              textShadowColor: '#00000011',
              textShadowRadius: 1,
              textShadowOffset: { width: -1, height: -1 },
            },
          ]}
        />
      </Animated.View>
    </View>
  );
});

CreateFirstItemPrompt.displayName = 'CreateFirstItemPrompt';

export { CreateFirstItemPrompt };
