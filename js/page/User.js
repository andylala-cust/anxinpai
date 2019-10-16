import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import {userTipChange} from '../action/user/actionCreators';
import {BubblesLoader} from 'react-native-indicator';

class User extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.init = this.init.bind(this)
  }
  init () {
    // alert(1)
  }
  // bottomTabNavigation每次进入时都执行某个函数
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.init()
    })
  }
  componentWillUnmount() {
    this.navListener.remove()
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BubblesLoader />
        <Text>User Page</Text>
        <Text onPress={() => this.props.tipChange()}>{this.props.tip || 'hello world'}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  tip: state.user.tip
})

const mapDispatchToProps = dispatch => ({
  tipChange () {
    const action = userTipChange('tip changed')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(User);
