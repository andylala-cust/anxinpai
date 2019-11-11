import React,{Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {getBaseLayout} from '../../action/houseInfo/actionCreators';
import {storage} from '../../util';
import _fetch from '../../fetch';
import {changeNotifyStatus} from '../../action/common/actionCreators';
import Toast from "react-native-root-toast";
import {ERR_OK} from '../../errCode';

const NOTIFY_RESOLVE = 'bell-o'; // 没有提醒
const NOTIFY_RESOLVE_TEXT = '结束前提醒';
const NOFITY_REJECT = 'bell-slash-o'; // 已提醒
const NOFITY_REJECT_TEXT = '取消提醒';
let self;

class HouseDetail extends Component {
  constructor (props) {
    super(props)
    self = this
    this.changeNotify = this.changeNotify.bind(this)
  }
  async changeNotify () {
    const url = `/user/houseNotify`
    const userId = await storage.getItem('user_id')
    const {id} = this.props.navigation.state.params
    const params = {
      user_id: userId,
      house_id: id,
      is_notified: this.props.notifyStatus ? 0 : 1,
      push_time: this.props.auction_start
    }
    _fetch.post(url, params)
      .then(data => {
        if (data.errCode === ERR_OK) {
          const notifyText = this.props.notifyStatus ? '取消成功' : '提醒成功'
          const toast = Toast.show(`${notifyText}^_^`, {
            position: 0
          })
          this.props._changeNotifyStatus(this.props.notifyStatus ? 0 : 1)
        } else {
          const toast = Toast.show(`未知错误，请重试>_<`, {
            position: 0
          })
        }
      })
  }
  handleLayout (event) {
    this.baseLayout = event.nativeEvent.layout
    this.props._getBaseLayout()
  }
  componentWillUnmount () {
    this.props._changeNotifyStatus(0)
  }
  render () {
    return (
      <View onLayout={event => this.handleLayout(event)}>
        <View style={styles.detailContainer}>
          <View style={styles.detailTagWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detailTag,{backgroundColor: '#3f59ff',color: '#fff',}]}>{this.props.cut || '-'}折</Text>
              <Text style={[styles.detailTag,{backgroundColor: '#eef0f3',color: '#7a8fbd',}]}>{this.props.circ || '-'}</Text>
              <Text numberOfLines={1} style={styles.detailAssetType}>{this.props.asset_type || '-'}</Text>
            </View>
            <TouchableOpacity onPress={() => this.changeNotify()}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome
                  name={this.props.notifyStatus ? NOFITY_REJECT : NOTIFY_RESOLVE}
                  size={13}
                  style={{marginRight: 3,lineHeight: 15,color: '#5186ec'}}
                />
                <Text style={{fontSize: 13,lineHeight: 15}}>{this.props.notifyStatus ? NOFITY_REJECT_TEXT : NOTIFY_RESOLVE_TEXT}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontSize: 19,lineHeight: 26,fontWeight: 'bold'}}>{this.props.title}</Text>
          </View>
          <View style={{flexDirection: 'row',marginBottom: 15}}>
            <View style={styles.detailPriceContainer}>
              <Text style={styles.detailPrice}>{parseInt(this.props.initialPrice/10000) || '-'}万</Text>
              <Text style={styles.detailTitle}>起拍价</Text>
            </View>
            <View style={styles.detailPriceContainer}>
              <Text style={styles.detailPrice}>{parseInt(this.props.consultPrice/10000) || '-'}万</Text>
              <Text style={styles.detailTitle}>法院评估价</Text>
            </View>
            <View style={styles.detailPriceContainer}>
              <Text style={styles.detailPrice}>{parseInt(this.props.marketPrice/10000) || '-'}万</Text>
              <Text style={styles.detailTitle}>市场评估价</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',marginBottom: 8}}>
            <Text style={styles.detailTime}>{this.props.auction_start || '-'}</Text>
            <Text style={{marginLeft: 10,marginRight: 10,fontSize: 15,lineHeight: 20}}>至</Text>
            <Text style={styles.detailTime}>{this.props.auction_end || '-'}</Text>
          </View>
          <View style={{flexDirection: 'row',marginBottom: 20}}>
            <Text style={styles.detailCount}>{this.props.applyCount || '-'}人报名</Text>
            <Text style={styles.detailCount}>{this.props.noticeCnt || '-'}人提醒</Text>
            <Text style={styles.detailCount}>{this.props.viewerCount || '-'}次围观</Text>
          </View>
          <View>
            <View style={styles.detailTagContainer}>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>保证金：</Text>
                {parseInt(this.props.margin/10000) || '-'}万
              </Text>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>单价：</Text>
                {parseInt(this.props.average) || '-'}/㎡
              </Text>
            </View>
            <View style={styles.detailTagContainer}>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>楼层：</Text>
                {this.props.floor || '-'}
              </Text>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>年代：</Text>
                {this.props.build_time || '-'}
              </Text>
            </View>
            <View style={styles.detailTagContainer}>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>面积：</Text>
                {this.props.area || '-'}㎡
              </Text>
            </View>
            <View style={styles.detailTagContainer}>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>小区：</Text>
                {this.props.community_name || '-'}
              </Text>
            </View>
            <View style={styles.detailTagContainer}>
              <Text style={styles.detailTagTitle} numberOfLines={1}>
                <Text style={styles.detailTagColor}>小学：</Text>
                {this.props.houseSchool.name || '-'}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {parseInt(this.props.houseSchool.distance) || '-'}米
              </Text>
            </View>
            <View style={styles.detailTagContainer}>
              <View style={{flex: 1,flexDirection: 'row'}}>
                <Text style={[styles.detailTagColor,{lineHeight: 20}]}>轨交：</Text>
                <Text style={{lineHeight: 20,flex: 1}}>
                  {this.props.trafficName || '-'}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {this.props.trafficAddress || '-'}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {parseInt(this.props.trafficDistance) || '-'}米
                </Text>
              </View>
            </View>
            <View style={styles.detailTagContainer}>
              <View style={{flex: 1,flexDirection: 'row'}}>
                <Text style={[styles.detailTagColor,{lineHeight: 20}]}>位置：</Text>
                <Text style={{lineHeight: 20,flex: 1}}>{this.props.location || this.props.title || '-'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
    backgroundColor: '#fff'
  },
  detailTagWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  detailTag: {
    marginRight: 10,
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 11,
    lineHeight: 15,
    borderRadius: 2
  },
  detailAssetType: {
    maxWidth: 100,
    marginRight: 10,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#eef0f3',
    fontSize: 11,
    color: '#7a8fbd',
    lineHeight: 15,
    borderRadius: 2
  },
  detailPriceContainer: {
    flex: 1
  },
  detailPrice: {
    marginBottom: 6,
    color: '#ff4738',
    fontWeight: 'bold',
    fontSize: 17
  },
  detailTitle: {
    color: '#aaa',
    fontSize: 12
  },
  detailTime: {
    fontSize: 15,
    lineHeight: 20
  },
  detailCount: {
    marginRight: 10,
    lineHeight: 16
  },
  detailTagContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  detailTagTitle: {
    flex: 1,
    lineHeight: 20
  },
  detailTagColor: {
    color: '#aaa'
  }
})

const mapStateToProps = state => ({
  notifyStatus: state.common.notifyStatus
})

const mapDispatchToProps  = dispatch => ({
  _getBaseLayout () {
    const action = getBaseLayout(self.baseLayout.y)
    dispatch(action)
  },
  _changeNotifyStatus (value) {
    const action = changeNotifyStatus(value)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(HouseDetail);
