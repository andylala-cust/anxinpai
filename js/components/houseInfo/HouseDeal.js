import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DELAY_LOAD_TIME} from '../../constants';

class HouseDeal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 3,
      toggleFold: true,
      toggleShow: false
    }
  }
  componentDidMount () {
    this.timer = setTimeout(() => {
      this.setState({
        toggleShow: true
      })
    }, DELAY_LOAD_TIME)
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  render () {
    return (
      <View>
        {
          this.state.toggleShow ? <View style={{position: 'relative',paddingLeft: 20,paddingRight: 20,backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}>同区域成交</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    toggleFold: !this.state.toggleFold,
                    index: this.state.toggleFold ? 10 : 3
                  })
                }}
              >
                <Ionicons
                  name={this.state.toggleFold ? 'ios-arrow-down': 'ios-arrow-up'}
                  size={14}
                  style={{padding: 10}}
                />
              </TouchableOpacity>
            </View>
            {
              this.props.houseDealArr.length > 0 ? this.props.houseDealArr.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={1}
                  onPress={() =>{
                    this.props.navigation.push('HouseInfo', {
                      id: item.id,
                      datafrom: item.datafrom
                    })
                  }}
                >
                  <View
                    style={[styles.itemWrapper,{display: this.state.index>index ? 'flex' : 'none'}]}
                  >
                    <View style={{width: '10%'}}>
                      <View style={styles.circle}></View>
                      <View style={styles.line}></View>
                    </View>
                    <View style={{flex: 1}}>
                      <View>
                        <Text style={{lineHeight: 20,marginBottom: 10}}>{item.title}</Text>
                      </View>
                      <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <Text style={{height: 16,lineHeight: 16,backgroundColor: '#00D1DB',fontWeight: 'bold',color: '#fff',paddingLeft: 3,paddingRight: 3,fontSize: 12,borderRadius: 2}}>{Math.floor(item.discount/10)}折</Text>
                        <Text style={{height: 16,lineHeight: 16,backgroundColor: '#d97888',fontWeight: 'bold',color: '#fff',paddingLeft: 3,paddingRight: 3,fontSize: 12,borderRadius: 2}}>单价{item.price}/㎡</Text>
                        <Text style={{height: 16,lineHeight: 16,backgroundColor: '#d94d90',fontWeight: 'bold',color: '#fff',paddingLeft: 3,paddingRight: 3,fontSize: 12,borderRadius: 2}}>面积{item.area}㎡</Text>
                      </View>
                    </View>
                    <View style={{width: '20%',justifyContent: 'center',alignItems: 'center'}}>
                      <Text style={{color: '#fa8a7c',fontSize: 16,fontWeight: 'bold'}}>{Math.floor(item.currentPrice/10000)}万</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )) : <View style={{paddingTop: 10,paddingBottom: 10}}>
                <Text style={{color: '#ccc'}}>暂无交易记录</Text>
              </View>
            }
          </View> : null
        }
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
  }
})

export default HouseDeal;
