import React,{Component} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import {Split} from '../components/common';
import {IMG_PLACE_COLOR,DEFAULT_USER_AVATAR} from '../constants';
import {storage} from '../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from "react-native-root-toast";
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const AVATAR_SIZE = 50;

class Setting extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '设置',
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
      userAvatar: DEFAULT_USER_AVATAR,
      userName: '',
      userPhone: ''
    }
    this.handleAvatar = this.handleAvatar.bind(this)
    this.handleNickName = this.handleNickName.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handlePwd = this.handlePwd.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  handleAvatar () {
    const toast = Toast.show('暂不支持修改头像>_<', {
      position: 0
    })
  }
  handleNickName () {
    this.props.navigation.navigate('UserName')
  }
  handlePhone () {
    const toast = Toast.show('暂不支持修改手机号>_<', {
      position: 0
    })
  }
  handlePwd () {

  }
  handleSignOut () {
    storage.clear()
      .then(() => {
        this.props.navigation.pop()
      })
  }
  async getUserInfo () {
    const userPhone = await storage.getItem('user_phone')
    const userAvatar = await storage.getItem('user_avatar')
    const userName = await storage.getItem('user_name')
    this.setState({
      userName,
      userAvatar,
      userPhone
    })
  }
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.getUserInfo()
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
        <View>
          <TouchableHighlight
            underlayColor={'#ededed'}
            onPress={() => {this.handleAvatar()}}
            style={{backgroundColor: '#fff'}}
          >
            <View style={styles.container}>
              <View style={styles.item}>
                <Text style={styles.title}>头像</Text>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                  <View style={{width: AVATAR_SIZE,height: AVATAR_SIZE,marginRight: 10,borderRadius: AVATAR_SIZE/2,overflow: 'hidden', backgroundColor: IMG_PLACE_COLOR}}>
                    <Image
                      style={{width: AVATAR_SIZE,height: AVATAR_SIZE}}
                      source={{uri: this.state.userAvatar}}
                    />
                  </View>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={18}
                  />
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'#ededed'}
            onPress={() => {this.handleNickName()}}
            style={{backgroundColor: '#fff'}}
          >
            <View style={styles.container}>
              <View style={styles.item}>
                <Text style={styles.title}>昵称</Text>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                  <Text numberOfLines={1} style={[styles.title,{maxWidth: 220}]}>{this.state.userName}</Text>
                  <Ionicons
                    name={'ios-arrow-forward'}
                    size={18}
                  />
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'#ededed'}
            onPress={() => {this.handlePhone()}}
            style={{backgroundColor: '#fff'}}
          >
            <View style={styles.container}>
              <View style={styles.item}>
                <Text style={styles.title}>手机号</Text>
                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                  <Text style={[styles.title,{marginRight: 0}]}>{this.state.userPhone}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'#ededed'}
            onPress={() => {this.handlePwd()}}
            style={{backgroundColor: '#fff'}}
          >
            <View style={[styles.container,{borderBottomColor: 'transparent'}]}>
              <View style={styles.item}>
                <Text style={styles.title}>修改密码</Text>
                <Ionicons
                  name={'ios-arrow-forward'}
                  size={18}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <Split color={'#f9f9f9'} />
        <TouchableHighlight
          underlayColor={'#ededed'}
          onPress={() => {this.handleSignOut()}}
          style={{backgroundColor: '#fff'}}
        >
          <View>
            <Text style={{lineHeight: 60,textAlign: 'center',color: '#006aff',fontSize: 17}}>退出登录</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb'
  },
  title: {
    fontSize: 14,
    marginRight: 10
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

export default connect(mapStateToProps,mapDispatchToProps)(Setting);
