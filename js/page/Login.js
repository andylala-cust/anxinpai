import React,{Component} from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {UserCodeLogin,UserPwdLogin} from '../components/user';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const CODE_LOGIN = '手机快捷登录';
const PWD_LOGIN = '账号密码登录';

class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '登录',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    headerBackTitle: null,
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <TouchableOpacity
      onPress={() => {navigation.navigate('Register')}}
    >
      <Text style={{paddingRight: 10,paddingLeft: 10,color: '#5186ec',fontWeight: 'bold',fontSize: 14}}>注册</Text>
    </TouchableOpacity>,
  })
  constructor (props) {
    super(props)
    this.state = {
      loginType: true // true 手机快捷登录，false 账号密码登录
    }
  }
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
      <ScrollView
        keyboardDismissMode={'on-drag'}
      >
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        {
          this.state.loginType ? <UserCodeLogin navigation={this.props.navigation} /> : <UserPwdLogin navigation={this.props.navigation} />
        }
        <View style={{marginTop: 20,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                loginType: !this.state.loginType
              })
            }}
          >
            <View>
              <Text style={{color: '#bbb',textAlign: 'center'}}>{this.state.loginType ? PWD_LOGIN : CODE_LOGIN}</Text>
            </View>
          </TouchableOpacity>
          {
            !this.state.loginType && <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('ChangePwd')}}
            >
              <View>
                <Text style={{color: '#bbb',marginLeft: 20}}>忘记密码</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
