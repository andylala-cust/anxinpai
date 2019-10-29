import React,{Component} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {Split} from  '../../components/common';
import Toast from 'react-native-root-toast';

const TITLE_ARR = [
  '我的余额',
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
  '帮助与反馈',
]

const IMG_ARR_ = [
  'http://static.yfbudong.com/user_wechat.png',
  'http://static.yfbudong.com/user_ally.png',
  'http://static.yfbudong.com/user_feedback.png',
]

class UserEntry extends Component {
  render () {
    return (
      <View>
        <View style={{flexDirection: 'row',flexWrap: 'wrap',paddingTop: 20,paddingBottom: 20}}>
          {
            TITLE_ARR.map((item,index) => (
              <TouchableOpacity
                onPress={() => {
                  const toast = Toast.show('敬请期待^_^', {
                    position: 0
                  })
                }}
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
                onPress={() => {
                  const toast = Toast.show('敬请期待^_^', {
                    position: 0
                  })
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
