import React, {Component} from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Placeholder, PlaceholderMedia, ShineOverlay} from 'rn-placeholder';
import Swiper from "react-native-swiper";

const SWIPER_HEIGHT = 140;

class HomeSwiper extends Component {
  render () {
    return (
      <View style={styles.swiperWrapper}>
        {
          !this.props.bannerList.length && <View
            style={{paddingLeft: 20,paddingRight: 20}}
          >
            <Placeholder
              Animation={ShineOverlay}
              Left={() => (
                <PlaceholderMedia
                  style={{width: '100%',height: SWIPER_HEIGHT}}
                />
              )}
            />
          </View>
        }
        <Swiper
          autoplay={true}
          style={styles.wrapper}
          key={this.props.bannerList.length}
          removeClippedSubviews={false}
          paginationStyle={{bottom: 3}} // 分页器位置
          dotStyle={{borderRadius: 1,width: 6,height: 2,}}
          activeDotStyle={{borderRadius: 1,width: 12,height: 2}}
          dotColor={'#aaa'}  // 分页器颜色
          activeDotColor={'#fff'}  // 选中的分页器颜色
          autoplayTimeout={3} // 间隔时间
        >
          {
            this.props.bannerList.map(item => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.callBack && this.props.callBack(item)}
                key={item.url}
                style={{flex: 1,paddingLeft: 20,paddingRight: 20}}
              >
                <View style={{flex: 1,backgroundColor: '#efefef'}}>
                  <Image
                    resizeMode={'stretch'}
                    source={{uri: item.url}}
                    style={{flex: 1,borderRadius: 5,}}
                  />
                </View>
              </TouchableOpacity>
            ))
          }
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  swiperWrapper: {
    height: SWIPER_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
})

export default HomeSwiper;
