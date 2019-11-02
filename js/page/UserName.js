import React,{Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Split} from '../components/common';
import {storage} from '../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from "react-native-root-toast";
import _fetch from '../fetch';
import {ERR_OK} from '../errCode';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
let self;

class UserName extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '更改昵称',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    headerBackTitle: null,
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <TouchableOpacity
      onPress={() => self.changeName()}
    >
      <Text style={{paddingRight: 10,paddingLeft: 10,color: '#5186ec',fontWeight: 'bold',fontSize: 14}}>保存</Text>
    </TouchableOpacity>,
  })
  constructor (props) {
    super(props)
    self = this
    this.state = {
      userName: '',
      userId: ''
    }
    this.getUserName = this.getUserName.bind(this)
  }
  async getUserName () {
    const userId = await storage.getItem('user_id')
    const userName = await storage.getItem('user_name')
    this.setState({
      userName,
      userId
    })
  }
  changeName () {
    if (this.state.userName) {
      StatusBar.setNetworkActivityIndicatorVisible(true)
      const url = `/user/changeInfo`
      const params = {
        user_id: this.state.userId,
        nickname: this.state.userName
      }
      _fetch.post(url, params)
        .then((data) => {
          StatusBar.setNetworkActivityIndicatorVisible(false)
          if (data.errCode === ERR_OK) {
            storage.setItem('user_name', this.state.userName)
              .then(() => {
                this.props.navigation.goBack()
              })
          } else {
            const toast = Toast.show(`未知错误>_<`, {
              position: 0
            })
          }
        })
    } else {
      const toast = Toast.show(`昵称不能为空>_<`, {
        position: 0
      })
    }
  }
  componentDidMount () {
    this.getUserName()
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
      <View>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <Split color={'#f9f9f9'} />
        <View
          style={{position: 'relative'}}
        >
          <TextInput
            autoCapitalize={'none'}
            autoFocus
            style={styles.input}
            defaultValue={this.state.userName}
            value={this.state.userName}
            maxLength={20}
            onChangeText={value => {
              this.setState({
                userName: value
              })
            }}
          />
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              this.setState({
                userName: ''
              })
            }}
          >
            <Ionicons
              size={26}
              name={'ios-close'}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    paddingLeft: 20,
    paddingRight: 100,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 10,
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10
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

export default connect(mapStateToProps,mapDispatchToProps)(UserName);
