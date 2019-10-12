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
    Clipboard.setString(this.props.id)
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
  }
})

export default HouseInfoFooter;
