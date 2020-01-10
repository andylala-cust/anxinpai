import React,{Component} from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';
import {Button} from "native-base";
import {CODE_CHECK, PHONE_CHECK, storage} from '../util';
import Toast from "react-native-root-toast";
import {REGISTER_CODE,MIN_PWD_LENGTH} from '../constants';
import _fetch from '../fetch';
import md5 from 'js-md5';
import {ERR_OK} from '../errCode';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const CODE_COLOR = '#bbb';
const CODE_TIME = 60;

class Register extends Component {
  static navigationOptions = {
    title: '注册',
    headerBackTitle: null,
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View />,
  }
  constructor (props) {
    super(props)
    this.state = {
      btnDisable: true,
      loginBtnDisable: true,
      codeColor: CODE_COLOR,
      codeText: '获取验证码',
      phone: '',
      code: '',
      pwd: '',
      msgId: ''
    }
    this.setUserInfo = this.setUserInfo.bind(this)
    this.login = this.login.bind(this)
    this.getCode = this.getCode.bind(this)
  }
  async setUserInfo (params) {
    const {user_id,phone,avatar,name} = params
    await storage.setItem('user_id', user_id.toString())
    await storage.setItem('user_phone', phone.toString())
    await storage.setItem('user_avatar', avatar.toString())
    await storage.setItem('user_name', name.toString())
  }
  async login () {
    if (this.state.pwd < MIN_PWD_LENGTH) {
      const toast = Toast.show(`密码不能少于${MIN_PWD_LENGTH}位>_<`, {
        position: 0
      })
    } else {
      StatusBar.setNetworkActivityIndicatorVisible(true)
      storage.getItem('city_id')
        .then(data => {
          const {code,phone,msgId,pwd} = this.state
          const url = `/user/register`
          const params = {
            phone,
            code,
            msg_id: msgId,
            pwd: md5(pwd),
            city_id: data
          }
          _fetch.post(url, params)
            .then(data => {
              StatusBar.setNetworkActivityIndicatorVisible(false)
              if (data.errCode === 1001) {
                const toast = Toast.show(`${data.content}>_<`, {
                  position: 0
                })
              } else if (data.errCode === ERR_OK){
                if (!data.content) {
                  const toast = Toast.show(`注册失败>_<`, {
                    position: 0
                  })
                } else {
                  this.setUserInfo(data.content)
                    .then(() => {
                      this.props.navigation.pop(2)
                    })
                }
              }
            })
        })
    }
  }
  getCode () {
    const url = `/user/sendCode`
    const params = {
      phone: this.state.phone,
      action: REGISTER_CODE
    }
    _fetch.post(url, params)
      .then(data => {
        this.setState({
          msgId: data.content.msg_id
        })
      })
    let time = CODE_TIME
    this.setState({
      codeText: `${time}s后重新获取`,
      btnDisable: true,
      codeColor: CODE_COLOR
    })
    this.timer = setInterval(() => {
      time--
      this.setState({
        codeText: `${time}s后重新获取`,
        btnDisable: true,
        codeColor: CODE_COLOR
      }, () => {
        if (time <= 0) {
          clearInterval(this.timer)
          if (this.state.phone.match(PHONE_CHECK)) {
            this.setState({
              codeText: `获取验证码`,
              btnDisable: false,
              codeColor: '#000'
            })
          } else {
            this.setState({
              codeText: `获取验证码`,
              btnDisable: true,
              codeColor: CODE_COLOR
            })
          }
        }
      })
    }, 1000)
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
      <ScrollView>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <View style={styles.wrapper}>
          <View style={{position: 'relative',marginBottom: 30}}>
            <TextInput
              keyboardType={'numeric'}
              placeholder={'请输入手机号'}
              maxLength={11}
              placeholderTextColor={CODE_COLOR}
              style={styles.textInput}
              onChangeText={(value) => {
                this.setState({
                  phone: value
                })
                if (value.match(PHONE_CHECK) && this.state.code.match(CODE_CHECK)) {
                  this.setState({
                    loginBtnDisable: false
                  })
                } else {
                  this.setState({
                    loginBtnDisable: true
                  })
                }
                if (value.match(PHONE_CHECK)) {
                  this.setState({
                    btnDisable: false,
                    codeColor: '#000',
                  })
                } else {
                  this.setState({
                    btnDisable: true,
                    codeColor: CODE_COLOR
                  })
                }
              }}
            />
            <Button
              transparent
              style={{position: 'absolute',right: 0,bottom: 0}}
              disabled={this.state.btnDisable}
              onPress={() => {this.getCode()}}
            >
              <Text style={{color: this.state.codeColor}}>{this.state.codeText}</Text>
            </Button>
          </View>
          <TextInput
            keyboardType={'numeric'}
            placeholder={'请输入验证码'}
            maxLength={6}
            placeholderTextColor={CODE_COLOR}
            style={[styles.textInput,{marginBottom: 30}]}
            onChangeText={(value) => {
              this.setState({
                code: value
              })
              if (value.match(CODE_CHECK) && this.state.phone.match(PHONE_CHECK)) {
                this.setState({
                  loginBtnDisable: false
                })
              } else {
                this.setState({
                  loginBtnDisable: true
                })
              }
            }}
          />
          <TextInput
            secureTextEntry
            placeholder={'请输入密码'}
            maxLength={20}
            placeholderTextColor={CODE_COLOR}
            style={styles.textInput}
            onChangeText={value => {
              this.setState({
                pwd: value
              })
            }}
          />
          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => {this.props.navigation.navigate('Protocol')}}
          >
            <View>
              <Text style={{color: '#bbb',fontSize: 13}}>已阅读并同意《安心拍服务协议》</Text>
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 30}}>
            <Button
              style={{justifyContent: 'center'}}
              disabled={this.state.loginBtnDisable}
              onPress={() => {this.login()}}
            >
              <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 15}}>同意协议并登录</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    padding: 20
  },
  textInput: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 16
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _userAddListener () {
    const action = userAddListener('')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Register);
