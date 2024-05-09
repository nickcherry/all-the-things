import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const isSmallScreen = screenHeight < 700;

export { isSmallScreen, screenHeight };
