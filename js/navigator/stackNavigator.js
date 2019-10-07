import {createStackNavigator} from 'react-navigation-stack';
import {Tab} from './bottomTabNavigator';
import Info from '../page/Info';
import Detail from '../page/Detail';
import More from '../page/More';
import HouseInfo from '../page/HouseInfo';
import Demo from '../page/Demo';
import Court from  '../page/Court'

export const StackNavigator = createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: null,
      headerBackTitle: null,
    }
  },
  Info,
  Detail,
  More,
  HouseInfo,
  Demo,
  Court
}, {
  headerMode: 'float',
  headerTransitionPreset: 'uikit',
});
