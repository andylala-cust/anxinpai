import React,{Component} from 'react';
import {Image, Text, View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {IS_IPHONEX} from '../../util';
import Toast from 'react-native-root-toast';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

class HouseBottomCard extends Component {
  render () {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.cardContainer}>
          <View style={{width: '38%',flexDirection: 'row'}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <View
                style={{width: 50,height: 50,borderRadius: 25,backgroundColor: '#bdbdbd'}}
              >
                <Image
                  source={{uri: this.props.avatar}}
                  style={{width: 50,height: 50,borderRadius: 25}}
                />
              </View>
            </View>
            <View style={{justifyContent: 'space-around',alignItems: 'flex-start',paddingLeft: 4}}>
              <Text style={{fontWeight: 'bold',fontSize: 16}}>{this.props.name || '-'}</Text>
              <Text style={{fontSize: 12,color: '#bababa'}}>{this.props.company_name || '-'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',width: '60%',justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[styles.cardLeftBtn,{backgroundColor: '#66c18f'}]}
              activeOpacity={1}
              onPress={() => {
                const toast = Toast.show('敬请期待^_^', {
                  position: 0
                })
              }}
            >
              <View>
                <Text style={styles.cardLeftText}>打电话</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardLeftBtn,{backgroundColor: '#3e74ee'}]}
              activeOpacity={1}
              onPress={() => {
                const toast = Toast.show('敬请期待^_^', {
                  position: 0
                })
              }}
            >
              <View>
                <Text style={styles.cardLeftText}>去贷款</Text>
              </View>
            </TouchableOpacity>
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
