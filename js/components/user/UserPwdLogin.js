import React,{Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {Button} from "native-base";
import _fetch from '../../fetch';
import {ERR_OK} from '../../errCode';
import Toast from "react-native-root-toast";
import md5 from 'js-md5';
import {storage} from '../../util';

const CODE_COLOR = '#bbb';

class UserPwdLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginBtnDisable: true,
      account: '',
      pwd: ''
    }
    this.pwdLogin = this.pwdLogin.bind(this)
    this.setUserInfo = this.setUserInfo.bind(this)
  }
  async setUserInfo (params) {
    const {user_id,phone,avatar,name} = params
    await storage.setItem('user_id', user_id.toString())
    await storage.setItem('user_phone', phone.toString())
    await storage.setItem('user_avatar', avatar.toString())
    await storage.setItem('user_name', name.toString())
  }
  pwdLogin () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const url = `/user/login`
    const user = this.state.account
    const pwd = md5(this.state.pwd)
    const params = {
      user,
      pwd
    }
    _fetch.post(url, params)
      .then(data => {
        StatusBar.setNetworkActivityIndicatorVisible(false)
        if (data.errCode === 1001) {
          const toast = Toast.show(`${data.content}>_<`, {
            position: 0
          })
        } else if (data.errCode === ERR_OK) {
          this.setUserInfo(data.content)
            .then(() => {
              this.props.navigation.goBack()
            })
        }
      })
  }
  render () {
    return (
      <View
        // alwaysBounceVertical={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>账号密码登录</Text>
          <View style={{marginTop: 80}}>
            <View style={{position: 'relative'}}>
              <TextInput
                keyboardType={'numeric'}
                maxLength={11}
                placeholder={'请输入账号'}
                placeholderTextColor={CODE_COLOR}
                style={styles.textInput}
                onChangeText={(value) => {
                  this.setState({
                    account: value
                  }, () => {
                    if (this.state.account && this.state.pwd) {
                      this.setState({
                        loginBtnDisable: false
                      })
                    } else {
                      this.setState({
                        loginBtnDisable: true
                      })
                    }
                  })
                }}
              />
            </View>
            <View style={{marginTop: 30}}>
              <TextInput
                secureTextEntry
                maxLength={20}
                placeholder={'请输入密码'}
                placeholderTextColor={'#bbb'}
                style={styles.textInput}
                onChangeText={(value) => {
                  this.setState({
                    pwd: value
                  }, () => {
                    if (this.state.account && this.state.pwd) {
                      this.setState({
                        loginBtnDisable: false
                      })
                    } else {
                      this.setState({
                        loginBtnDisable: true
                      })
                    }
                  })
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
              onPress={() => {this.pwdLogin()}}
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

export default UserPwdLogin;
