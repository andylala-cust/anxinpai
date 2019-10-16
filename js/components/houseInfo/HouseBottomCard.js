import React,{Component} from 'react';
import {Image, Text, View, StyleSheet, Platform} from 'react-native';
import {IS_IPHONEX} from '../../util';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

class HouseBottomCard extends Component {
  render () {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContainer}>
          <View style={{width: '38%',flexDirection: 'row'}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Image
                source={{uri: 'http://static.yfbudong.com/20211492_1563796879100_6.jpeg'}}
                style={{width: 50,height: 50,borderRadius: 25}}
              />
            </View>
            <View style={{justifyContent: 'space-around',alignItems: 'flex-start',paddingLeft: 4}}>
              <Text style={{fontWeight: 'bold',fontSize: 16}}>周蓉</Text>
              <Text style={{fontSize: 12,color: '#bababa'}}>海豚官方</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',width: '60%',justifyContent: 'space-between'}}>
            <View style={[styles.cardLeftBtn,{backgroundColor: '#66c18f'}]}>
              <Text style={styles.cardLeftText}>在线问</Text>
            </View>
            <View style={[styles.cardLeftBtn,{backgroundColor: '#3e74ee'}]}>
              <Text style={styles.cardLeftText}>去贷款</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT+80,
    paddingTop: 10,
    paddingBottom: TAB_BAR_HEIGHT+10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset:{
          width: 0,
          height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      }
    })
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between'
  },
  cardLeftBtn: {
    width: '48%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardLeftText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default HouseBottomCard;
