import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {Split} from  '../../components/common';
import Toast from 'react-native-root-toast';
import {storage} from '../../util';


const TITLE_ARR = [
  '我的优惠券',
  '我的会员',
  '我的咨询',
  '我的消息',
  '我的收藏',
  '我的邀请',
  '我的提醒',
  '我的服务',
]

const IMG_ARR = [
  'http://static.yfbudong.com/user_balance.png',
  'http://static.yfbudong.com/user_vip.png',
  'http://static.yfbudong.com/user_consult.png',
  'http://static.yfbudong.com/user_msg.png',
  'http://static.yfbudong.com/user_collect.png',
  'http://static.yfbudong.com/user_invite.png',
  'http://static.yfbudong.com/user_notify.png',
  'http://static.yfbudong.com/user_loan.png',
]

const TITLE_ARR_ = [
  '法拍房交流群',
  '加盟咨询',
  '帮助反馈',
]

const IMG_ARR_ = [
  'http://static.yfbudong.com/user_wechat.png',
  'http://static.yfbudong.com/user_ally.png',
  'http://static.yfbudong.com/user_feedback.png',
]

class UserEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
    this.handleTopEntryClick = this.handleTopEntryClick.bind(this)
    this.handleUserItemClick = this.handleUserItemClick.bind(this)
  }
  async handleTopEntryClick (index) {
    const userId = await storage.getItem('user_id')
    if (!userId) {
      this.props.navigation.navigate('Login')
      return
    }
    switch (index) {
      case 0: {
        this.props.navigation.navigate('UserCoupon')
        break
      }
      case 1: {
        this.props.navigation.navigate('UserVip')
        break
      }
      case 2: {
        this.props.navigation.navigate('UserConsult')
        break
      }
      case 3: {
        this.props.navigation.navigate('UserMsg')
        break
      }
      case 4: {
        this.props.navigation.navigate('UserLove', {
          toggleEdit: false
        })
        break
      }
      case 5: {
        this.props.navigation.navigate('UserInvite')
        break
      }
      case 6: {
        this.props.navigation.navigate('UserNotify', {
          toggleEdit: false
        })
        break
      }
      case 7: {
        this.props.navigation.navigate('UserLoan')
        break
      }
      default: {
        break
      }
    }
  }
  handleUserItemClick (index) {
    switch (index) {
      case 0: {
        this.props.navigation.navigate('UserGroup')
        break
      }
      case 1: {
        const item = {
          kefu_name: null,
          kefu_phone: null,
          targetUrl: "http://static.yfbudong.com/banner_xiaoyuanzhuo_detail",
          title: "发现投资新机会",
          url: "http://static.yfbudong.com/banner_2.png",
        }
        this.props.navigation.navigate('HomeBannerDetail', {
          item
        })
        break
      }
      case 2: {
        this.props.navigation.navigate('UserFeedBack')
        break
      }
      default: {
        break
      }
    }
  }
  render () {
    return (
      <View>
        <View style={{flexDirection: 'row',flexWrap: 'wrap',paddingTop: 20,paddingBottom: 20}}>
          {
            TITLE_ARR.map((item,index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.handleTopEntryClick(index)}
                style={{width: '25%',alignItems: 'center',justifyContent: 'center',paddingTop: 10,paddingBottom: 10}
                }>
                <View style={{marginBottom: 5}}>
                  <Image
                    source={{
                      uri: IMG_ARR[index],
                      width: 24,
                      height: 24
                    }}
                  />
                </View>
                <Text style={{height: 24,lineHeight: 24,fontSize: 13}}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <Split />
        <View style={{flexDirection: 'row',flexWrap: 'wrap',paddingTop: 20,paddingBottom: 20}}>
          {
            TITLE_ARR_.map((item,index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.handleUserItemClick(index)
                }}
                style={{width: '25%',alignItems: 'center',justifyContent: 'center',paddingTop: 10,paddingBottom: 10}}
              >
                <View style={{marginBottom: 5}}>
                  <Image
                    source={{
                      uri: IMG_ARR_[index],
                      width: 24,
                      height: 24
                    }}
                  />
                </View>
                <Text style={{height: 24,lineHeight: 24,fontSize: 13}}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

export default UserEntry;
