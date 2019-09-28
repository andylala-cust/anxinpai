import {Dimensions} from 'react-native';

const WINDOW = Dimensions.get('window');
const SCREEN_HEIGHT = WINDOW.height
const IPHONE_X_HEIGHT = 812;
const _IPHONE_X_HEIGHT = 896;

const IS_IPHONEX = Platform.OS === 'ios' && (SCREEN_HEIGHT === IPHONE_X_HEIGHT || SCREEN_HEIGHT === _IPHONE_X_HEIGHT);

export default IS_IPHONEX;
