import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { FC, useEffect, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '~/context/ThemeProvider';
import { useDerivedValue } from '~/hook/reanimated/useDerivedValue';

const duration = 6000;

const Background: FC = () => {
  const { colors, t } = useTheme();
  const { width, height } = useWindowDimensions();

  const colorIndexRef = useRef(0);

  const color1 = useSharedValue(colors.bgGradientsInitialColors[0]);
  const color2 = useSharedValue(colors.bgGradientsInitialColors[1]);

  const animatedColors = useDerivedValue(() => {
    return [color1.value, color2.value];
  }, [color1.value, color2.value]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const updateAndSchedule = () => {
      const index = ++colorIndexRef.current % colors.bgGradients.length;
      const nextColors = colors.bgGradients[index];
      const options = { duration };

      color1.value = withTiming(nextColors[0], options);
      color2.value = withTiming(nextColors[1], options);

      timeout = setTimeout(updateAndSchedule, duration);
    };

    updateAndSchedule();

    return () => {
      clearTimeout(timeout);
    };
  }, [color1, color2, colors.bgGradients]);

  return (
    <Canvas style={[t.absolute, t.inset0]}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          colors={animatedColors}
          start={vec(0, 0)}
          end={vec(width, height)}
        />
      </Rect>
    </Canvas>
  );
};

export { Background };
