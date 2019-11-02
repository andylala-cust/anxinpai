import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  StatusBar
} from 'react-native';
import {Button} from 'native-base';
import {CODE_CHECK, PHONE_CHECK} from '../../util';
import _fetch from '../../fetch';
import {REGISTER_CODE} from '../../constants';
import {storage} from '../../util';
import Toast from 'react-native-root-toast';
import {ERR_OK} from '../../errCode';

const CODE_COLOR = '#bbb';
const CODE_TIME = 60;

class UserCodeLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codeText: '获取验证码',
      codeColor: CODE_COLOR,
      btnDisable: true,
      loginBtnDisable: true,
      phone: '',
      code: '',
      msgId: ''
    }
    this.login = this.login.bind(this)
    this.getCode = this.getCode.bind(this)
    this.setUserInfo = this.setUserInfo.bind(this)
  }
  async login () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    storage.getItem('city_id')
      .then(data => {
        const {code,phone,msgId} = this.state
        const url = `/user/codeLogin`
        const params = {
          phone,
          code,
          msg_id: msgId,
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
              this.setUserInfo(data.content)
                .then(() => {
                  this.props.navigation.goBack()
                })
            }
          })
      })
  }
  async setUserInfo (params) {
    const {user_id,phone,avatar,name} = params
    await storage.setItem('user_id', user_id.toString())
    await storage.setItem('user_phone', phone.toString())
    await storage.setItem('user_avatar', avatar.toString())
    await storage.setItem('user_name', name.toString())
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
  render () {
    return (
      <View
        // alwaysBounceVertical={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>手机快捷登录</Text>
          <Text style={styles.tip}>未注册过的手机号将自动创建海豚号</Text>
          <View style={{marginTop: 80}}>
            <View style={{position: 'relative'}}>
              <TextInput
                keyboardType={'numeric'}
                maxLength={11}
                placeholder={'请输入手机号'}
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
            <View style={{marginTop: 30}}>
              <TextInput
                keyboardType={'numeric'}
                maxLength={6}
                placeholder={'请输入验证码'}
                placeholderTextColor={'#bbb'}
                style={styles.textInput}
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
            </View>
          </View>
          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => {this.props.navigation.navigate('Protocol')}}
          >
            <View>
              <Text style={{color: '#bbb',fontSize: 13}}>已阅读并同意《海豚选房服务协议》</Text>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  tip: {
    marginTop: 10,
    fontSize: 13,
    color: '#bbb'
  },
  textInput: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 16
  }
})

export default UserCodeLogin;
