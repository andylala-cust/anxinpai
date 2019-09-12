import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from './Home';
import About from './About';
import Info from './Info';
import Detail from './Detail'
import More from './More'
import User from './User'
import Service from './Service';

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor, focused}) => (
          <Entypo
            name={'home'}
            size={20}
            style={{color: tintColor}}
          />
        )
      }
    },
    Service: {
      screen: Service,
      navigationOptions: {
        tabBarLabel: '服务',
        tabBarIcon: ({tintColor, focused}) => (
          <FontAwesome
            name={'handshake-o'}
            size={20}
            style={{color: tintColor}}
          />
        )
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        tabBarLabel: '收藏',
        tabBarIcon: ({tintColor, focused}) => (
          <SimpleLineIcons
            name={'star'}
            size={20}
            style={{color: tintColor}}
          />
        )
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <AntDesign
            name={'user'}
            size={20}
            style={{color: tintColor}}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato'
    }
  }
);

export default createAppContainer(createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  Info,
  Detail,
  More
},{
  headerMode: 'screen'
}))
