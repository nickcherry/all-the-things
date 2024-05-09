import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, memo, RefObject, useEffect, useRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { useTheme } from '~/context/ThemeProvider';
import { useTouchOutside } from '~/context/TouchOutsideProvider';
import { RootStackParamList } from '~/type/navigation';

type TextInputProps = RNTextInputProps & {
  inputRef?: RefObject<RNTextInput>;
  shouldBlurOnTouchOutside?: boolean;
};

const TextInput: FC<TextInputProps> = memo(
  ({
    autoFocus,
    onBlur,
    onFocus,
    inputRef: refParam,
    shouldBlurOnTouchOutside = true,
    style,
    ...props
  }) => {
    const { colors, t } = useTheme();
    const defaultRef = useRef<RNTextInput>(null);
    const ref = refParam || defaultRef;
    const { setInputRef } = useTouchOutside();
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
      // https://github.com/react-navigation/react-navigation/issues/11626#issuecomment-1823588248

      if (autoFocus) {
        const unsubscribe = navigation.addListener('transitionEnd', (e) => {
          if (e.data.closing === false) {
            setTimeout(() => ref.current?.focus());
          }
        });

        return unsubscribe;
      }
    }, [autoFocus, navigation, ref]);

    return (
      <RNTextInput
        placeholderTextColor={colors.textPlaceholder}
        style={[
          t.borderBHairline,
          t.borderInput,
          t.textDefault,
          t.textLg,
          t.fontRegular,
          t.pB2,
          style,
        ]}
        ref={ref}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e);
          }

          if (shouldBlurOnTouchOutside) {
            setInputRef({ current: null });
          }
        }}
        onFocus={(e) => {
          if (onFocus) {
            onFocus(e);
          }

          if (shouldBlurOnTouchOutside) {
            setInputRef(ref);
          }
        }}
        {...props}
      />
    );
  },
);

TextInput.displayName = 'TextInput';

export { TextInput };
