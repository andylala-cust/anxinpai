import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeMainEntry extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => {alert(1)}}>
          <View style={styles.item}>
            <Ionicons
              name={'ios-map'}
              size={26}
              style={[styles.icon,{color: '#5fff46'}]}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>区域选房</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {alert(2)}}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name={'map-marker-radius'}
              size={26}
              style={[styles.icon,{color: '#55ffe1'}]}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>地图找房</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {alert(3)}}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name={'bullseye-arrow'}
              size={26}
              style={[styles.icon,{color: '#ffb689'}]}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>捡漏必看</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {alert(4)}}>
          <View style={styles.item}>
            <Ionicons
              name={'ios-book'}
              size={26}
              style={[styles.icon,{color: '#a4b0ff'}]}
            />
            <View style={styles.textWrapper}>
              <Text style={styles.text}>法拍百科</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    lineHeight: 30,
  },
  textWrapper: {
    marginTop: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    height: 14,
    lineHeight: 14,
  }
});

export default HomeMainEntry;
