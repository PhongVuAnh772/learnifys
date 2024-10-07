import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SMALL_SCREEN_WIDTH = 360;
const SMALL_SCREEN_HEIGHT = 640;

export const useDimensions = () => {
    const isSmallScreen = width < SMALL_SCREEN_WIDTH && height < SMALL_SCREEN_HEIGHT;
    return isSmallScreen
}
