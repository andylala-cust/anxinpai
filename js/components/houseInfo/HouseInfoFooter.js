import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Clipboard} from 'react-native';
import Toast from 'react-native-root-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class HouseInfoFooter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toastVisible: false,
      toastText: '复制成功^_^'
    }
  }
  handleCopy () {
    this.timer && clearTimeout(this.timer)
    // 切记toString()，否则安卓会报错
    Clipboard.setString(this.props.id.toString())
    this.setState({
      toastVisible: true
    })
    this.timer = setTimeout(() => {
      this.setState({
        toastVisible: false
      })
    }, 1000)
  }
  render () {
    return (
      <View style={styles.wrapper}>
        <Toast
          visible={this.state.toastVisible}
          position={0}
          shadow={true}
          animation={true}
          hideOnPress={false}
        >
          {this.state.toastText}
        </Toast>
        <View style={styles.topWrapper}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <MaterialIcons
              name={'info-outline'}
              size={14}
              style={{color: '#807e7e'}}
            />
            <Text style={{color: '#807e7e',marginLeft: 5}}>房源号  {this.props.id}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.handleCopy()}
          >
            <View>
              <Text style={{fontWeight: 'bold',color: '#006aff'}}>复制房源号</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tipWrapper}>
          <Text style={styles.text}>1.房源所示“税费，小区，年代，风险价，收益空间”仅供参考，购房时请以实际交易情况为准。</Text>
          <Text style={styles.text}>2.周边配套中学校、交通、生活、医疗相关的数据均来源于高德地图。</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: '#f8f8f9'
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tipWrapper: {
    marginTop: 20
  },
  text: {
    fontSize: 12,
    lineHeight: 20,
    color: '#cbcbcb'
  }
})

export default HouseInfoFooter;
