import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from './Home';
import About from './About';
import Info from './Info';
import Detail from './Detail'
import More from './More'
import User from './User'
import Service from './Service';
import HouseInfo from './HouseInfo'

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor, focused}) => (
          <MaterialCommunityIcons
            name={focused ? 'home' : 'home-outline'}
            size={23}
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
          <MaterialCommunityIcons
            name={focused ? 'account-group' : 'account-group-outline'}
            size={23}
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
          <FontAwesome
            name={focused ? 'star' : 'star-o'}
            size={23}
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
          <FontAwesome
            name={focused ? 'user' : 'user-o'}
            size={23}
            style={{color: tintColor}}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#5186ec',
      inactiveTintColor: '#9b9b9b',
      style: {
        backgroundColor: '#fff',
        borderTopColor: 'transparent',
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset:{
          width: 0,
          height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }
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
  More,
  HouseInfo
},{
  headerMode: 'screen'
}))
