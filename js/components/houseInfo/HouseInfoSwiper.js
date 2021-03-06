import React,{Component} from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import Swiper from "react-native-swiper";
import {connect} from 'react-redux';
import {showPreview,updatePreviewIndex} from '../../action/houseInfo/actionCreators';

const SWIPER_HEIGHT = 240;

const styles = StyleSheet.create({
  wrapper: {
    height: SWIPER_HEIGHT,
  },
  // 图片全屏
  houseImgItem: {
    flex: 1,
  },
});

class HouseInfoSwiper extends Component {
  render () {
    return (
      <Swiper style={styles.wrapper} key={this.props.houseImgList.length}>
        {
          this.props.houseImgList.map((item, index) => (
            <TouchableOpacity style={{flex: 1,backgroundColor: '#efefef'}} activeOpacity={1} key={index} onPress={() => this.props._showPreview(index)}>
              <Image
                resizeMode={'stretch'}
                source={{uri: item}}
                style={styles.houseImgItem}
              />
            </TouchableOpacity>
          ))
        }
      </Swiper>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _showPreview (index) {
    const action = showPreview(true)
    dispatch(action)
    const _action = updatePreviewIndex(index)
    dispatch(_action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(HouseInfoSwiper);
