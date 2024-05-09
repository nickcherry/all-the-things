import { useFonts } from 'expo-font';
import { FC, ReactNode } from 'react';

import {
  regularFont,
  regularFontFamily,
  semiboldFont,
  semiboldFontFamily,
} from '~/constant/font';

type FontLoaderProps = {
  children: ReactNode;
};

const FontLoader: FC<FontLoaderProps> = ({ children }) => {
  const [areFontsLoaded] = useFonts({
    [regularFontFamily]: regularFont,
    [semiboldFontFamily]: semiboldFont,
  });

  if (!areFontsLoaded) {
    return null;
  }

  return children;
};

FontLoader.displayName = 'FontLoader';

export { FontLoader };
