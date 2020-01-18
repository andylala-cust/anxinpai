import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware,createReduxContainer} from 'react-navigation-redux-helpers';
import {Tab} from './bottomTabNavigator';
import {
  Info,
  Detail,
  More,
  HouseInfo,
  Demo,
  Court,
  Around,
  HouseValue,
  HomeBannerDetail,
  Login,
  Register,
  Protocol,
  Setting,
  UserName,
  ChangePwd,
  UserGroup,
  UserFeedBack,
  UserPostFeedBack,
  CityList,
  Search,
  UserNotify,
  UserLove,
  Compare,
  CompareDetail,
  UserCoupon,
  UserVip,
  UserConsult,
  UserMsg,
  UserInvite,
  UserLoan,
  Encyclopedia,
  ArticleDetail,
  HomePromoteDetail
} from '../page';
import {transitionConfiguration} from '../util';

export const rootCom = 'Tab';

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
  Court,
  Around,
  HouseValue,
  HomeBannerDetail,
  Login,
  Register,
  Protocol,
  Setting,
  UserName,
  ChangePwd,
  UserGroup,
  UserFeedBack,
  UserPostFeedBack,
  CityList,
  Search,
  UserNotify,
  UserLove,
  Compare,
  CompareDetail,
  UserCoupon,
  UserVip,
  UserConsult,
  UserMsg,
  UserInvite,
  UserLoan,
  Encyclopedia,
  ArticleDetail,
  HomePromoteDetail
}, {
  headerMode: 'float',
  headerTransitionPreset: 'uikit',
  transitionConfig: (sceneProps) => ({
    screenInterpolator: transitionConfiguration(sceneProps)
  })
});

export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

const AppWithNavigationState = createReduxContainer(StackNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
