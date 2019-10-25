import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Animated,
  Easing
} from 'react-native';
import {Badge,Avatar} from 'react-native-elements';

class Service extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0)
    }
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }
  handleBtnClick () {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
    }).start()
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/*<Button*/}
        {/*  title={'start animation'}*/}
        {/*  onPress={() => this.handleBtnClick()}*/}
        {/*/>*/}
        {/*<Animated.View style={{opacity: this.state.opacity}}>*/}
        {/*  <Text>lalala</Text>*/}
        {/*</Animated.View>*/}
        {/*<Text>*/}
        {/*  Service Page*/}
        {/*</Text>*/}
        {/*<View>*/}
        {/*  <Avatar*/}
        {/*    rounded*/}
        {/*    source={{*/}
        {/*      uri: 'http://static.yfbudong.com/cat.png',*/}
        {/*    }}*/}
        {/*    size="large"*/}
        {/*  />*/}
        {/*  <Badge*/}
        {/*    value={'99'}*/}
        {/*    status={'error'}*/}
        {/*    containerStyle={{ position: 'absolute', top: -4, right: -4 }}*/}
        {/*  />*/}
        {/*</View>*/}
        {/*<Button*/}
        {/*  title={'Go To Info Page'}*/}
        {/*  onPress={() => this.props.navigation.navigate('Info')}*/}
        {/*/>*/}
        <Text>敬请期待</Text>
      </View>
    )
  }
}

export default Service;
