import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {IS_IPHONEX} from '../../util';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

class BottomTip extends Component {
  render () {
    return (
      <View style={[styles.wrapper,this.props.isIphoneX && styles.iphone_x]}>
        <View style={styles.container}>
          <View style={[styles.line,styles.lineLeft]}></View>
          <Text style={styles.text}>我是有底线的哟～</Text>
          <View style={[styles.line,styles.lineRight]}></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  iphone_x: {
    height: TAB_BAR_HEIGHT+40,
    paddingTop: 10,
    paddingBottom: TAB_BAR_HEIGHT+10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    position: 'absolute',
    width: '20%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bbb'
  },
  lineLeft: {
    left: 16
  },
  lineRight: {
    right: 16
  },
  text: {
    fontSize: 12
  }
})

export default BottomTip;
