import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

let INIT_INDEX = 3;

class HouseDeal extends Component {
  render () {
    return (
      <View style={{position: 'relative',paddingLeft: 25,paddingRight: 25}}>
        <View>
          <Text style={{marginBottom: 10,fontWeight: 'bold'}}>同区域成交</Text>
        </View>
        {
          this.props.houseDealArr.map((item, index) => (
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
                style={[styles.itemWrapper,{display: INIT_INDEX>index ? 'flex' : 'none'}]}
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
                    <Text style={{height: 16,lineHeight: 16,backgroundColor: '#3f59ff',color: '#fff',paddingLeft: 3,paddingRight: 3,fontSize: 12,borderRadius: 2}}>{Math.floor(item.discount/10)}折</Text>
                    <Text style={{height: 16,lineHeight: 16,backgroundColor: '#eef0f3',color: '#7a8fbd',paddingLeft: 3,paddingRight: 3,fontSize: 12,borderRadius: 2}}>单价{item.price}/㎡</Text>
                    <Text style={{height: 16,lineHeight: 16,backgroundColor: '#eef0f3',color: '#7a8fbd',paddingLeft: 3,paddingRight: 3,fontSize: 12,borderRadius: 2}}>面积{item.area}㎡</Text>
                  </View>
                </View>
                <View style={{width: '20%',justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color: '#fa8a7c',fontSize: 16,fontWeight: 'bold'}}>{Math.floor(item.currentPrice/10000)}万</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
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
