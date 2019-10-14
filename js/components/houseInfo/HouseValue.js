import React,{Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getValueLayout} from '../../action/houseInfo/actionCreators';
import Ionicons from 'react-native-vector-icons/Ionicons';

let self;

class HouseValue extends Component {
  constructor (props) {
    super(props)
    self = this
    this.formatTime = this.formatTime.bind(this)
    this.handleLayout = this.handleLayout.bind(this)
  }
  formatTime (str) {
    if (!str) return
    const arr = str.split(' ')
    const date = arr[0].toString()
    const arr_ = date.split('/')
    const resDate = `${arr_[0]}年${arr_[1]}月${arr_[2]}日`
    return resDate
  }
  handleLayout (event) {
    this.valueLayout = event.nativeEvent.layout
    this.props._getValueLayout()
  }
  render () {
    return (
      <View onLayout={event => this.handleLayout(event)}>
        <View style={{padding: 20,backgroundColor: '#fff',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 17,fontWeight: 'bold'}}>房产价值</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('HouseValue')
          }}>
            <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{marginRight: 5,color: '#807e7e', fontSize: 12}}>查看更多</Text>
              <Ionicons
                name={'ios-arrow-forward'}
                size={14}
                color={'#807e7e'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{position: 'relative',paddingLeft: 20,paddingRight: 20,backgroundColor: '#fff'}}>
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _getValueLayout () {
    const action = getValueLayout(self.valueLayout.y)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(HouseValue);
