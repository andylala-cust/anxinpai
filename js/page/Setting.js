import React,{Component} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';
import {Split} from '../components/common';
import {IMG_PLACE_COLOR,DEFAULT_USER_AVATAR} from '../constants';
import {storage} from '../util';

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
      userAvatar: DEFAULT_USER_AVATAR
    }
    this.getUserInfo = this.getUserInfo.bind(this)
  }
  async getUserInfo () {
    // await storage.getItem('')
  }
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
    this.getUserInfo()
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
        <View>
          <TouchableHighlight
            onPress={() => {}}
          >
            <View style={styles.item}>
              <Text style={styles.title}>头像</Text>
              <View style={{width: AVATAR_SIZE,height: AVATAR_SIZE,borderRadius: AVATAR_SIZE/2,overflow: 'hidden', backgroundColor: IMG_PLACE_COLOR}}>
                <Image
                  style={{width: AVATAR_SIZE,height: AVATAR_SIZE}}
                  source={{uri: this.state.userAvatar}}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 16
  }
})

export default Setting;
