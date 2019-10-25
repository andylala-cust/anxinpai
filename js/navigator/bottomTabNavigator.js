import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../page/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Service from '../page/Service';
import Collect from '../page/Collect';
import {Platform, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Badge} from 'react-native-elements';
import User from '../page/User';
import React from 'react';

export const Tab = createBottomTabNavigator(
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
      screen: Collect,
      navigationOptions: {
        tabBarLabel: '收藏',
        tabBarIcon: ({tintColor, focused}) => (
          <AntDesign
            name={focused ? 'star' : 'staro'}
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
          <View>
            <MaterialIcons
              name={focused ? 'person' : 'person-outline'}
              size={26}
              style={{color: tintColor}}
            />
            {/*<Badge*/}
            {/*  value={'9'}*/}
            {/*  status={'error'}*/}
            {/*  containerStyle={{ position: 'absolute', top: -2, right: -20 }}*/}
            {/*/>*/}
          </View>
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#006aff',
      inactiveTintColor: '#9b9b9b',
      style: {
        backgroundColor: '#fff',
        borderTopColor: 'transparent',
        borderTopWidth: 0,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset:{
              width: 0,
              height: 1
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 10,
          }
        })
      }
    }
  }
);
