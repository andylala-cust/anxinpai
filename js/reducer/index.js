import {combineReducers} from 'redux';
import {rootCom,StackNavigator} from '../navigator/stackNavigator';
import UserReducer from './user';
import HouseInfoReducer from './houseInfo'

// 指定默认 state
const navState = StackNavigator.router.getStateForAction(StackNavigator.router.getActionForPathAndParams(rootCom));

// 创建自己的 navigation reducer
const navReducer = (state = navState, action) => {
  const nextState = StackNavigator.router.getStateForAction(action, state);
  // 如果`nextState`为null或未定义，只需返回原始`state`
  return nextState || state;
};

// 合并 reducer
const index = combineReducers({
  nav: navReducer,
  user: UserReducer,
  houseInfo: HouseInfoReducer
});

export default index;
