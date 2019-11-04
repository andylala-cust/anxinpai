import React,{Component} from 'react';
import {View, Dimensions, ScrollView, Image, Text, StatusBar} from 'react-native';
import Toast from 'react-native-root-toast';
import {DotsLoader} from 'react-native-indicator';
import {STATUSBAR_HEIGHT} from '../util';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class HomeBannerDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state
    return {
      title: params.item.title,
      // 解决安卓标题不居中
      headerTitleStyle:{
        flex: 1,
        textAlign:'center',
        color: '#5186ec'
      },
      // 解决左边有按钮，右边无按钮标题不居中
      headerRight: <View />,
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      toggleLoad: false
    }
  }
  componentDidMount () {
    StatusBar.setBarStyle(BARSTYLE)
    Image.getSize(this.props.navigation.getParam('item').targetUrl, (width,height) => {
      this.setState({
        width: screenWidth,
        height: screenWidth * height / width,
        toggleLoad: true
      })
    }, () => {
      const toast = Toast.show('网络不佳>_<', {
        position: 0
      })
    })
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
        {
          this.state.toggleLoad ? <Image
            style={{width: this.state.width,height: this.state.height}}
            source={{uri: this.props.navigation.getParam('item').targetUrl}}
          /> : <View style={{position: 'absolute',left: 0,top: 0,width: screenWidth,height: screenHeight-STATUSBAR_HEIGHT,zIndex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <DotsLoader />
          </View>
        }
      </ScrollView>
    )
  }
}

export default HomeBannerDetail;
