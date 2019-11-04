import React,{Component} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Textarea} from 'native-base';
import LinearGradient from "react-native-linear-gradient";
import _fetch from '../../fetch';
import {storage} from '../../util';
import Toast from "react-native-root-toast";

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class UserPostFeedBack extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '意见反馈',
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
      feedBackContent: '',
      contact: ''
    }
    this.postFeedBack = this.postFeedBack.bind(this)
  }
  async postFeedBack () {
    const userId = await storage.getItem('user_id')
    if (!userId) {
      this.props.navigation.navigate('Login')
      return
    }
    if (!this.state.feedBackContent) {
      const toast = Toast.show('内容不能为空哦>_<', {
        position: 0
      })
      return
    }
    const url = `/user/postBug`
    const params = {
      content: this.state.feedBackContent,
      concat: this.state.contact,
      user_id: userId,
      phone: this.state.contact
    }
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.post(url, params)
      .then(() => {
        StatusBar.setNetworkActivityIndicatorVisible(false)
        const toast = Toast.show('提交成功^_^', {
          position: 0
        })
        this.timer = setTimeout(() => {
          this.props.navigation.goBack()
        }, 500)
      })
  }
  componentDidMount () {
    StatusBar.setBarStyle(BARSTYLE)
    this.timer && clearTimeout(this.timer)
  }
  render () {
    return (
      <ScrollView
        keyboardDismissMode={'on-drag'}
      >
        <View style={{padding: 20}}>
          <Text style={{fontSize: 16,fontWeight: 'bold'}}>反馈内容(必填)</Text>
        </View>
        <View style={{padding: 20}}>
          <Textarea
            placeholderTextColor={'#bbb'}
            autoCapitalize={'none'}
            rowSpan={5}
            placeholder="请输入亲的宝贵意见ヾ(o◕∀◕)ﾉ"
            maxLength={200}
            style={{paddingLeft: 10,paddingRight: 10,borderWidth: StyleSheet.hairlineWidth,borderColor: '#bbb',borderRadius: 5,fontSize: 16}}
            onChangeText={value => {
              this.setState({
                feedBackContent: value
              })
            }}
          ></Textarea>
        </View>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 16,fontWeight: 'bold'}}>联系方式(可选)</Text>
        </View>
        <View style={{padding: 20}}>
          <TextInput
            keyboardType={'numeric'}
            placeholderTextColor={'#bbb'}
            autoCapitalize={'none'}
            placeholder="请输入亲的联系方式ヾ(o◕∀◕)ﾉ"
            maxLength={20}
            style={{paddingLeft: 10,paddingRight: 10,height: 40,borderWidth: StyleSheet.hairlineWidth,borderColor: '#bbb',borderRadius: 5,fontSize: 16}}
            onChangeText={value => {
              this.setState({
                contact: value
              })
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {this.postFeedBack()}}
          style={{marginLeft: 20,marginRight: 20,}}
        >
          <LinearGradient
            colors={['#f857a6', '#ff5858']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}
          >
            <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 16}}>提交意见</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 40,
    borderRadius: 25
  }
})

export default UserPostFeedBack;
