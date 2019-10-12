import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

class HomeSummary extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>每日法拍行情</Text>
          <View style={styles.botWrapper}>
            <View style={styles.item}>
              <Text style={[styles.itemText,styles.itemCount]}>{this.props.jrcj_sum || '-'}</Text>
              <Text style={styles.itemText}>今日成交</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.itemText,styles.itemCount]}>{this.props.jrxz_sum || '-'}</Text>
              <Text style={styles.itemText}>今日新增</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.itemText,styles.itemCount]}>{this.props.wrbm_sum || '-'}</Text>
              <Text style={styles.itemText}>无人报名</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.itemText,styles.itemCount]}>{this.props.jrlp_sum || '-'}</Text>
              <Text style={styles.itemText}>今日流拍</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingTop: 0
  },
  container: {
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    borderRadius: 3
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  botWrapper: {
    flexDirection: 'row',
    marginTop: 10
  },
  item: {
    flex: 1
  },
  itemCount: {
    height: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemText: {
    textAlign: 'center',
    height: 30,
    lineHeight: 30
  }
})

export default HomeSummary;
