import React,{Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class UserGroup extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '法拍房交流群',
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
    StatusBar.setBarStyle(BARSTYLE)
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
        <View
          style={{justifyContent: 'center',alignItems: 'center'}}
        >
          <View
            style={{
              width: 300,
              height: 400,
              marginTop: 60,
            }}
          >
            <Image
              style={{
                width: '100%',
                height: '100%'
              }}
              source={{uri: 'http://static.yfbudong.com/wechat-group.jpg'}}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default UserGroup;
