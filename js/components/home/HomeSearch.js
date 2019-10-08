import React, {Component} from 'react';
import {STATUSBAR_HEIGHT} from '../../util';
import {Text, View, StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeSearch extends Component {
  render () {
    return (
      <View
        style={styles.searchWrapper}
      >
        <View
          style={styles.left}
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
        <View style={styles.right}>
          <MaterialCommunityIcons
            name={'map-marker'}
            size={20}
            style={{color: '#5186ec'}}
          />
          <Text style={styles.city}>上海</Text>
        </View>
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
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 3,
  }
})

export default HomeSearch;
