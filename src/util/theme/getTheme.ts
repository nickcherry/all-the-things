import { TextStyle, ViewStyle } from 'react-native';
import { t } from 'react-native-tailwindcss';

import { regularFontFamily, semiboldFontFamily } from '~/constant/font';
import { ResolvedColorScheme } from '~/type/settings';

import { getColorWithAlpha } from './getColorWithAlpha';

const sizeUnit = 4;

const sizes = {
  s1: sizeUnit,
  s2: sizeUnit * 2,
  s3: sizeUnit * 3,
  s4: sizeUnit * 4,
  s5: sizeUnit * 5,
  s6: sizeUnit * 6,
  s7: sizeUnit * 7,
  s8: sizeUnit * 8,
  s9: sizeUnit * 9,
  s10: sizeUnit * 10,
  s11: sizeUnit * 11,
  s12: sizeUnit * 12,
  s13: sizeUnit * 13,
  s14: sizeUnit * 14,
  s15: sizeUnit * 15,
  s16: sizeUnit * 16,
  s17: sizeUnit * 17,
  s18: sizeUnit * 18,
  s19: sizeUnit * 19,
  s20: sizeUnit * 20,
  s21: sizeUnit * 21,
  s22: sizeUnit * 22,
  s23: sizeUnit * 23,
  s24: sizeUnit * 24,
  s25: sizeUnit * 25,
  s26: sizeUnit * 26,
  s27: sizeUnit * 27,
  s28: sizeUnit * 28,
  s29: sizeUnit * 29,
  s30: sizeUnit * 30,
  s31: sizeUnit * 31,
  s32: sizeUnit * 32,
  s33: sizeUnit * 33,
  s34: sizeUnit * 34,
  s35: sizeUnit * 35,
  s36: sizeUnit * 36,
  s37: sizeUnit * 37,
  s38: sizeUnit * 38,
  s39: sizeUnit * 39,
  s40: sizeUnit * 40,
  s41: sizeUnit * 41,
  s42: sizeUnit * 42,
};

const borderRadius = (radius: number): ViewStyle => ({ borderRadius: radius });
const borderTRadius = (radius: number): ViewStyle => ({
  borderTopLeftRadius: radius,
  borderTopRightRadius: radius,
});
const borderColor = (color: string): ViewStyle => ({ borderColor: color });
const borderWidth = (width: number): ViewStyle => ({ borderWidth: width });
const borderBottomWidth = (width: number): ViewStyle => ({
  borderBottomWidth: width,
});
const borderTopWidth = (width: number): ViewStyle => ({
  borderTopWidth: width,
});
const borderLeftWidth = (width: number): ViewStyle => ({
  borderLeftWidth: width,
});
const borderRightWidth = (width: number): ViewStyle => ({
  borderRightWidth: width,
});
const bgColor = (color: string): ViewStyle => ({ backgroundColor: color });
const font = (family: string, weight: TextStyle['fontWeight']): TextStyle => ({
  fontFamily: family,
  fontWeight: weight,
});
const textColor = (color: string): TextStyle => ({ color });

const hairlineThickness = 0.25;

function getTheme({ scheme }: { scheme: ResolvedColorScheme }) {
  const dark = scheme === 'dark';

  const white = '#ffffff';
  const black = '#2b313f';

  const textLight = white;
  const textDark = '#27222b';

  const borderLight = '#e8e8e8';
  const borderDark = '#423a49';

  const textDefault = dark ? textLight : textDark;
  const textMuted = '#959aa5';
  const textFaint = dark ? '#808080' : '#dadada';
  const textInverted = dark ? textDark : textLight;
  const textSelection = textDefault;
  const textSettingsIcon = textMuted;
  const textOverdue = '#e04273';

  const bgScreen = dark ? '#191919' : white;
  const bgListItem = bgScreen;
  const bgListItemComplete = dark ? '#191919' : '#efefef';
  const bgList = dark
    ? getColorWithAlpha(bgScreen, 0.8)
    : getColorWithAlpha(bgScreen, 0.8);
  const borderDefault = dark
    ? getColorWithAlpha(borderLight, 0.1)
    : getColorWithAlpha(borderDark, 0.4);
  const borderAddItemButton = white;
  const borderPanel = dark
    ? getColorWithAlpha(white, 0.05)
    : getColorWithAlpha(black, 0.15);
  const borderSuggestedLocation = dark
    ? getColorWithAlpha(white, 0.05)
    : getColorWithAlpha(black, 0.15);

  const bgButton = black;

  const bgPriorityLowest = '#46a887';
  const bgPriorityLow = '#8dc137';
  const bgPriorityMedium = '#ffe200';
  const bgPriorityHigh = '#f28e39';
  const bgPriorityHighest = '#e04273';

  const bgSliderTrackLeft = dark ? white : '#56bcd9';
  const bgSliderTrackRight = textFaint;

  const bgPanel = bgScreen;
  const switchThumb = bgScreen;
  const switchTrackOff = bgScreen;
  const switchTrackOn = '#56bcd9';
  const switchIosBgColor = dark ? '#333333' : bgScreen;

  const tintRefresh = dark ? textDark : textLight;

  const textButton = textLight;
  const textRemoveButton = dark ? textLight : textMuted;
  const textItemCompleted = textMuted; //  '#c5cbda';

  const colors = {
    bgButton,
    bgBottomSheet: bgScreen,
    bgList,
    bgListItem,
    bgListItemComplete,
    bgRemoveItem: '#ea3374',
    bgScreen,
    bgPriorityLowest,
    bgPriorityLow,
    bgPriorityMedium,
    bgPriorityHigh,
    bgPriorityHighest,
    bgPanel,

    bgSliderTrackLeft,
    bgSliderTrackRight,

    bgGradientsInitialColors: ['#0575E6', '#00F260'],
    bgGradients: dark
      ? [
          ['#ad5389', '#2e0941'],
          ['#224dc8', '#050822'],
          ['#8d7d01', '#18140b'],
        ]
      : [
          ['#3059cf', '#00F260'],
          ['#ee0979', '#fee096'],
          ['#a779ec', '#f28e39'],
        ],

    borderDefault,
    borderLight,
    borderInput: borderDefault,
    borderAddItemButton,
    borderPanel,
    borderSuggestedLocation,

    tintRefresh,

    switchIosBgColor,
    switchThumb,
    switchTrackOff,
    switchTrackOn,

    textDark,
    textDefault,
    textFaint,
    textInverted,
    textLight,
    textMuted,
    textPlaceholder: textFaint,
    textSelection,
    textSettingsIcon,
    textRemoveButton,
    textButton,
    textItemCompleted,
    textOverdue,
  };

  const theme = {
    colors,
    scheme,
    sizes,
    t: {
      ...t,

      bgBottomSheet: bgColor(colors.bgBottomSheet),
      bgList: bgColor(colors.bgList),
      bgListItem: bgColor(colors.bgListItem),
      bgListItemComplete: bgColor(colors.bgListItemComplete),
      bgRemoveItem: bgColor(colors.bgRemoveItem),
      bgScreen: bgColor(colors.bgScreen),
      bgPanel: bgColor(colors.bgPanel),
      bgButton: bgColor(colors.bgButton),

      borderDefault: borderColor(colors.borderDefault),
      borderLight: borderColor(colors.borderLight),
      borderAddItemButton: borderColor(colors.borderAddItemButton),
      borderPanel: borderColor(colors.borderPanel),
      borderInput: borderColor(colors.borderInput),
      borderSuggestedLocation: borderColor(colors.borderSuggestedLocation),
      borderHairline: borderWidth(hairlineThickness),
      borderBHairline: borderBottomWidth(hairlineThickness),
      borderTHairline: borderTopWidth(hairlineThickness),
      borderLHairline: borderLeftWidth(hairlineThickness),
      borderRHairline: borderRightWidth(hairlineThickness),

      fontRegular: font(regularFontFamily, '400'),
      fontSemibold: font(semiboldFontFamily, '600'),

      roundedXl: borderRadius(sizes.s3),
      roundedTXl: borderTRadius(sizes.s3),

      rounded2xl: borderRadius(sizes.s4),
      roundedT2xl: borderTRadius(sizes.s4),

      rounded3xl: borderRadius(sizes.s5),
      roundedT3xl: borderTRadius(sizes.s5),

      textDark: textColor(colors.textDark),
      textDefault: textColor(colors.textDefault),
      textInverted: textColor(colors.textInverted),
      textLight: textColor(colors.textLight),
      textMuted: textColor(colors.textMuted),
      textFaint: textColor(colors.textFaint),
      textRemoveButton: textColor(colors.textRemoveButton),
      textSettingsIcon: textColor(colors.textSettingsIcon),
      textButton: textColor(colors.textButton),
      textItemCompleted: textColor(colors.textItemCompleted),
      textOverdue: textColor(colors.textOverdue),
    },
  };

  return theme;
}

export { getTheme };
