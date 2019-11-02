import React,{Component} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Split} from '../components/common';
import {Button} from 'native-base';
import {PHONE_CHECK, storage} from '../util';
import {CHANGE_PWD,MIN_PWD_LENGTH} from '../constants';
import _fetch from '../fetch';
import md5 from 'js-md5';
import Toast from "react-native-root-toast";
import {ERR_OK} from '../errCode';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';

const CODE_COLOR = '#bbb';
const CODE_TIME = 60;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class ChangePwd extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '更改密码',
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
  constructor (props) {
    super(props)
    this.state = {
      codeText: '获取验证码',
      codeDisable: false,
      btnDisable: true,
      codeColor: '#000',
      code: '',
      pwd: '',
      phone: '',
      msgId: ''
    }
    this.handleCodeClick = this.handleCodeClick.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }
  handleCodeClick () {
    const url = `/user/sendCode`
    const params = {
      phone: this.state.phone,
      action: CHANGE_PWD
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
      codeDisable: true,
      codeColor: CODE_COLOR
    })
    this.timer = setInterval(() => {
      time--
      this.setState({
        codeText: `${time}s后重新获取`,
        codeDisable: true,
        codeColor: CODE_COLOR
      }, () => {
        if (time <= 0) {
          clearInterval(this.timer)
          this.setState({
            codeText: `获取验证码`,
            codeDisable: false,
            codeColor: '#000'
          })
        }
      })
    }, 1000)
  }
  handleBtnClick () {
    const url = `/user/forgotPwd`
    const {code,pwd,phone,msgId} = this.state
    if (pwd.length < MIN_PWD_LENGTH) {
      const toast = Toast.show(`密码不能少于${MIN_PWD_LENGTH}位>_<`, {
        position: 0
      })
    } else {
      const params = {
        code,
        pwd: md5(pwd),
        phone,
        msg_id: msgId
      }
      StatusBar.setNetworkActivityIndicatorVisible(true)
      _fetch.post(url, params)
        .then(data => {
          StatusBar.setNetworkActivityIndicatorVisible(false)
          if (data.errCode === 1001) {
            const toast = Toast.show(`无效的验证码>_<`, {
              position: 0
            })
          } else if (data.errCode === ERR_OK) {
            if (data.content === 'fail') {
              const toast = Toast.show(`无效的验证码>_<`, {
                position: 0
              })
            } else {
              this.props.navigation.goBack()
            }
          }
        })
    }
  }
  async getPhone () {
    const phone = await storage.getItem('user_phone')
    this.setState({
      phone
    })
    return phone
  }
  componentDidMount () {
    this.getPhone()
      .then(data => {
        if (data) {
          this.setState({
            codeDisable: false,
            codeColor: '#000',
          })
        } else {
          this.setState({
            codeDisable: true,
            codeColor: CODE_COLOR,
          })
        }
      })
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
        style={{backgroundColor: '#f9f9f9'}}
      >
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <Split color={'#f9f9f9'} />
        <View style={styles.wrapper}>
          <View style={styles.phoneWrapper}>
            <TextInput
              placeholder={'请输入手机号'}
              defaultValue={this.state.phone}
              style={{height: 50}}
              maxLength={11}
              keyboardType={'numeric'}
              onChangeText={value => {
                this.setState({
                  phone: value
                })
                if (value.match(PHONE_CHECK)) {
                  this.setState({
                    codeDisable: false,
                    codeColor: '#000',
                  })
                } else {
                  this.setState({
                    codeDisable: true,
                    codeColor: CODE_COLOR
                  })
                }
              }}
            />
            {/*<Text style={{lineHeight: 50}}>{this.state.phone}</Text>*/}
            <Button
              transparent
              disabled={this.state.codeDisable}
              style={styles.codeWrapper}
              onPress={() => this.handleCodeClick()}
            >
              <Text style={{color: this.state.codeColor}}>{this.state.codeText}</Text>
            </Button>
          </View>
          <TextInput
            maxLength={6}
            placeholder={'请输入验证码'}
            placeholderTextColor={'#bbb'}
            style={styles.input}
            keyboardType={'numeric'}
            onChangeText={value => {
              this.setState({
                code: value
              })
              if (value && this.state.pwd) {
                this.setState({
                  btnDisable: false
                })
              } else {
                this.setState({
                  btnDisable: true
                })
              }
            }}
          />
          <TextInput
            secureTextEntry
            maxLength={20}
            placeholder={'请输入密码'}
            placeholderTextColor={'#bbb'}
            style={styles.input}
            onChangeText={value => {
              this.setState({
                pwd: value
              })
              if (value && this.state.code) {
                this.setState({
                  btnDisable: false
                })
              } else {
                this.setState({
                  btnDisable: true
                })
              }
            }}
          />
          <Button
            disabled={this.state.btnDisable}
            style={{marginTop: 20,justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {this.handleBtnClick()}}
          >
            <Text style={{color: '#fff'}}>提交</Text>
          </Button>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: '#fff'
  },
  phoneWrapper: {
    position: 'relative',
    height: 50,
    backgroundColor: '#fff',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  codeWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
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

export default connect(mapStateToProps,mapDispatchToProps)(ChangePwd);
