import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import {
  View,
  Text,
  Button
} from 'react-native';

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#5186ec" />
);

let self;

class Info extends Component {
  static navigationOptions = {
    title: '信息',
    headerBackTitle: null,
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center'
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="back" iconName="md-arrow-back" onPress={() => self.btnPress()} />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
        <Item title="select" iconName="ios-heart-empty" onPress={() => alert('heart')} />
      </HeaderButtons>
    )
  }
  constructor (props) {
    super(props)
    self = this
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Info Page</Text>
        <Button
          title={'Go To More Page'}
          onPress={() => this.props.navigation.navigate('More')}
        />
      </View>
    )
  }
}

export default Info;
