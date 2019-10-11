import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class HouseValue extends Component {
  constructor (props) {
    super(props)
    this.formatTime = this.formatTime.bind(this)
  }
  formatTime (str) {
    if (!str) return
    const arr = str.split(' ')
    const date = arr[0].toString()
    const arr_ = date.split('/')
    const resDate = `${arr_[0]}年${arr_[1]}月${arr_[2]}日`
    return resDate
  }
  render () {
    return (
      <View>
        <View style={{padding: 25}}>
          <View>
            <Text style={{fontSize: 17,fontWeight: 'bold'}}>房产价值</Text>
          </View>
        </View>
        <View style={{position: 'relative',paddingLeft: 25,paddingRight: 25}}>
          <View>
            <Text style={{marginBottom: 10,fontWeight: 'bold'}}>交易记录</Text>
          </View>
          {
            this.props.houseStatusArr ? this.props.houseStatusArr.map(item => (
              <View style={styles.itemWrapper} key={item.id}>
                <View style={{width: '10%'}}>
                  <View style={styles.circle}></View>
                  <View style={styles.line}></View>
                </View>
                <View style={{flex: 1,flexDirection: 'row'}}>
                  <View>
                    <Text style={[styles.text,{fontWeight: 'bold'}]}>{item.circ}{item.cn_status}</Text>
                  </View>
                  <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={[styles.text]}>{this.formatTime(item.start_time)}开始</Text>
                    <Text style={styles.text}>{this.formatTime(item.end_time)}开始</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>{item.cn_price}</Text>
                    <Text style={[styles.text,{color: '#fa8a7c',fontWeight: 'bold'}]}>{item.currentPrice}</Text>
                  </View>
                </View>
              </View>
            )) : <View style={{paddingTop: 10,paddingBottom: 10}}>
              <Text style={{color: '#ccc'}}>暂无交易记录</Text>
            </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: '#cbcbcb',
    borderRadius: 4
  },
  line: {
    position: 'absolute',
    left: 4 - StyleSheet.hairlineWidth / 2,
    top: 0,
    width: StyleSheet.hairlineWidth,
    height: '100%',
    backgroundColor: '#cbcbcb'
  },
  text: {
    height: 40,
    lineHeight: 40
  }
})

export default HouseValue;
