import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

class BottomTip extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
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
    paddingBottom: 20
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
