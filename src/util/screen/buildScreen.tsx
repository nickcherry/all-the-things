import { FC, memo } from 'react';

import { Screen } from '~/component/screen/Screen';

type BuildScreenOptions = {
  avoidKeyboard?: boolean;
  background?: 'transparent' | 'opaque';
  keyboardVerticalOffset?: number;
  insetTop?: boolean;
  insetBottom?: boolean;
  insetTabBarBgColor?: boolean;
};

const buildScreen = <T extends Record<string, unknown>>(
  {
    avoidKeyboard = false,
    background = 'opaque',
    keyboardVerticalOffset,
    insetTop = false,
    insetBottom = true,
  }: BuildScreenOptions,
  Content: FC<T>,
) =>
  memo((props: T) => {
    const screenProps = {
      background,
      insetTop,
      insetBottom,
      avoidKeyboard,
      keyboardVerticalOffset,
    };

    return (
      <Screen {...screenProps}>
        <Content {...props} />
      </Screen>
    );
  });

export { buildScreen };
