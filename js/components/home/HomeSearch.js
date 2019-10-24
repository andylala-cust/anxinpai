import React, {Component} from 'react';
import {STATUSBAR_HEIGHT} from '../../util';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';

class HomeSearch extends Component {
  render () {
    return (
      <View
        style={styles.searchWrapper}
      >
        <TouchableOpacity
          style={styles.left}
          activeOpacity={1}
          onPress={() => {
            const toast = Toast.show('敬请期待^_^', {
              position: 0
            })
          }}
        >
          <View
            style={{flexDirection: 'row', alignItems: 'center',height: 40,}}
          >
            <EvilIcons
              name={'search'}
              size={22}
              style={{marginLeft: 10}}
            />
            <View
              style={styles.tipWrapper}
            >
              <Text style={styles.tip}>你想投资哪里</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.right}
          onPress={() => {
            const toast = Toast.show('敬请期待^_^', {
              position: 0
            })
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <MaterialCommunityIcons
              name={'map-marker'}
              size={20}
              style={{color: '#5186ec'}}
            />
            <Text style={styles.city} numberOfLines={1}>{this.props.cityName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingTop: STATUSBAR_HEIGHT,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 600,
    backgroundColor: '#fff',
  },
  left: {
    width: '72%',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    borderRadius: 3,
  },
  tipWrapper: {
    height: '100%',
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  tip: {
    color: '#bbb',
    fontSize: 16,
  },
  right: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  city: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 3,
  }
})

export default HomeSearch;
