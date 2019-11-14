import React,{Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {userAddListener} from '../../action/user/actionCreators';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class UserMsg extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '消息',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    headerBackTitle: null,
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View></View>,
  })
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
    this.props._userAddListener()
  }
  componentWillUnmount () {
    this.navListener.remove()
  }
  render () {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <Text>你还没有消息>_&lt;</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _userAddListener () {
    const action = userAddListener('')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(UserMsg);
