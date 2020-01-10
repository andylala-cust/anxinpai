import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const HOT_STATUS = '正在拍卖';

class HouseList extends Component {
  render () {
    return (
      <TouchableOpacity
        onPress={() => this.props.callBack && this.props.callBack(this.props.item)}
        activeOpacity={1}
      >
        <View
          style={styles.listWrapper}
        >
          <View style={styles.listContainer}>
            <View style={styles.listItemImgWrapper}>
              <View style={[styles.tag,this.props.item.cn_status === HOT_STATUS && {backgroundColor: '#f00'}]}>
                <Text style={styles.tagText}>{this.props.item.cn_status}</Text>
              </View>
              <Image
                style={styles.listItemImg}
                source={{uri: this.props.item.pic_url}}
              />
            </View>
            <View
              style={styles.listItemInfoWrapper}
            >
              <View>
                <Text
                  style={styles.listItemInfoTitle}
                  numberOfLines={1}
                >{this.props.item.title}</Text>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 6,alignItems: 'center'}}
              >
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',marginRight: 10}}>
                  <Text style={[styles.listItemInfoPrice,{fontWeight: 'bold'}]}>
                    <Text style={{color: '#000',fontSize: 12,fontWeight: 'normal'}}>起拍价</Text>
                    &nbsp;&nbsp;
                    {Math.floor(this.props.item.initialPrice / 10000) || '-'}万
                  </Text>
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={[styles.listItemInfoPrice,{fontSize: 13,fontWeight: 'bold'}]}>
                    <Text style={{color: '#000',fontSize: 12,fontWeight: 'normal'}}>评估价</Text>
                    &nbsp;&nbsp;
                    {Math.floor(this.props.item.consultPrice / 10000) || '-'}万
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row'}}
              >
                <Text style={styles.listItemInfoDetail}>{this.props.item.area || '-'}m²</Text>
                <Text style={[styles.listItemInfoDetail,{marginLeft: 10}]}>{this.props.item.floor || '-'}楼</Text>
                <Text style={[styles.listItemInfoDetail,{marginLeft: 10}]}>{this.props.item.community_name || '-'}</Text>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 4}}
              >
                <Text style={[styles.listItemInfoTag,{backgroundColor: '#00D1DB',color: '#fff',fontWeight: 'bold'}]}>{this.props.item.cut || '- -'}折</Text>
                <Text style={[styles.listItemInfoTag,{marginLeft: 10,backgroundColor: '#d97888',color: '#fff',fontWeight: 'bold'}]}>{this.props.item.circ || '-'}</Text>
                <Text numberOfLines={1} style={[styles.listItemInfoTag,{marginLeft: 10,maxWidth: '50%',backgroundColor: '#d94d90',color: '#fff',fontWeight: 'bold'}]}>{this.props.item.asset_type || '-'}</Text>
              </View>
              <View>
                <Text style={{height: 20,lineHeight: 20,fontSize: 12,color: '#b32e26',fontWeight: 'bold'}}>起拍时间：{this.props.item.start_time || '-'}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  tag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9,
    width: '80%',
    height: 18,
    backgroundColor: '#ff7f70'
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#fff'
  },
  listWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f1f1f1',
  },
  listItemImgWrapper: {
    width: '30%',
    height: 80,
    backgroundColor: '#efefef'
  },
  listItemImg: {
    width: '100%',
    height: 80,
  },
  listItemInfoWrapper: {
    width: '70%',
    paddingLeft: 20,
  },
  listItemInfoTitle: {
    height: 20,
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
  },
  listItemInfoDetail: {
    height: 20,
    fontSize: 12,
    lineHeight: 20,
    color: '#e3986d',
    fontWeight: 'bold'
  },
  listItemInfoTag: {
    height: 16,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#eef0f3',
    fontSize: 12,
    lineHeight: 16,
    color: '#7a8fbd',
    borderRadius: 3,
  },
  listItemInfoPrice: {
    height: 14,
    lineHeight: 14,
    color: '#f00',
    fontSize: 14,
  }
});

export default HouseList;
