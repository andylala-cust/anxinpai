import React,{Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Swiper from "react-native-swiper";

const SWIPER_HEIGHT = 130;

class HomeSwiperPro extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bannerList: [
        {
          url: 'http://static.yfbudong.com/anxin_banner_1.png',
          id: 1
        },
        {
          url: 'http://static.yfbudong.com/anxin_banner_2.png',
          id: 2
        }
      ]
    }
  }
  render () {
    return (
      <View style={styles.swiperWrapper}>
        <Swiper
          autoplay={true}
          key={this.state.bannerList.length}
          removeClippedSubviews={false}
          paginationStyle={{bottom: 3}} // 分页器位置
          dotStyle={{borderRadius: 1,width: 6,height: 2,}}
          activeDotStyle={{borderRadius: 1,width: 12,height: 2}}
          dotColor={'#aaa'}  // 分页器颜色
          activeDotColor={'#fff'}  // 选中的分页器颜色
          autoplayTimeout={3} // 间隔时间
        >
          {
            this.state.bannerList.map(item => (
              <View
                key={item.id}
                style={{flex: 1,marginLeft: 20,marginRight: 20,backgroundColor: '#efefef'}}
              >
                <Image
                  source={{uri: item.url}}
                  style={{flex: 1,borderRadius: 5,}}
                />
              </View>
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
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
})

export default HomeSwiperPro;
