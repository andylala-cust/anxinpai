import {IS_IPHONEX} from './index';
import {StatusBar} from 'react-native';

const IPHONE_STATUSBAR = 20;
const IPHONEX_STATUSBAR = 44;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONEX ? IPHONEX_STATUSBAR : IPHONE_STATUSBAR) : StatusBar.currentHeight;

export default STATUSBAR_HEIGHT;
