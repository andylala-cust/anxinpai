import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

class FilterBar extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.tabItemWrapper}>
          <View style={styles.tabItem}>
            <Text style={[styles.active]}>类型</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
              style={[styles.active]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper}>
          <View style={styles.tabItem}>
            <Text>价格</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper}>
          <View style={styles.tabItem}>
            <Text>排序</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper}>
          <View style={styles.tabItem}>
            <Text>区域</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper}>
          <View style={styles.tabItem}>
            <Text>更多</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d1d1'
  },
  tabItemWrapper: {
    flex: 1
  },
  tabItem: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  active: {
    color: '#006aff'
  }
})

export default FilterBar;
