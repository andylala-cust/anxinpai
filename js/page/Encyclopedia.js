import React,{Component} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import {Card,CardItem} from 'native-base';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';
import {Tabs, Tab, ScrollableTab, Accordion, Icon} from 'native-base';
import {PAGE_SIZE} from '../constants';
import {ERR_OK} from '../errCode';
import _fetch from '../fetch';
import Toast from "react-native-root-toast";
import {BottomTip, LoadMore} from '../components/common';
import {IS_IPHONEX} from '../util';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const TAB_ARRAY_FIRST = [
  {
    title: '首次参拍注意事项'
  },
  {
    title: '司法拍卖房产可以贷款吗？'
  },
  {
    title: '实地看样的重要性'
  },
  {
    title: '司法拍卖房产是否限购？'
  },
  {
    title: '司法拍卖房产需要缴纳哪些税？'
  },
  {
    title: '最高院评定的网络拍卖平台有哪几个，如何查看？'
  },
  {
    title: '拍卖成交后悔拍不买的后果'
  }
];
const TAB_ARRAY_SECOND = [
  {
    title: '保证金交纳规则'
  },
  {
    title: '保证金什么时候交？'
  },
  {
    title: '可以使用别人的银行卡交保吗？'
  },
  {
    title: '双休日可以交保吗？'
  },
  {
    title: '如何知道是否已经交保成功？'
  }
];
const TAB_ARRAY_THIRD = [
  {
    title: '参与司法拍卖的具体流程如下'
  },
  {
    title: '出价规则'
  },
  {
    title: '竞拍周期'
  },
  {
    title: '延时5分钟'
  },
  {
    title: '报名后不出价可以吗'
  },
  {
    title: '一人报名出价可以成交吗'
  },
  {
    title: '什么是优先购买权人'
  },
  {
    title: '哪些人享有优先购买权？'
  },
  {
    title: '优先购买权人享有什么权利？'
  },
  {
    title: '什么是变卖？'
  },
  {
    title: '变卖公告何时发布？'
  },
  {
    title: '变卖期为多久？'
  },
  {
    title: '变卖价为多少？'
  },
  {
    title: '变卖规则'
  },
  {
    title: '变卖成交不买的后果'
  },
  {
    title: '什么是重新拍卖？'
  },
  {
    title: '流拍后什么时候再上拍？'
  },
];
const TAB_ARRAY_FOURTH = [
  {
    title: '拍卖成交后尾款支付'
  },
  {
    title: '尾款支付后应该怎么办'
  },
  {
    title: '法院会提供哪些材料'
  }
];
const TAB_CONTENT_ARR_FIRST_FIRST = [
  '请仔细阅读法院公告并预约海豚实地看样，以便充分了解标的物实际情况；',
  '如有贷款需求，建议开拍前3-5天预约海豚确认贷款详细方案；',
  '确定参加竞拍，务必确认已有对应拍卖平台的账号，且账号需完成实名认证；',
  '报名交保证金，建议提前1-2天缴纳保证金，交保成功即是报名成功；',
  '拍卖开始后方可出价，若报名成功不想出价也可以不出价，保证金不会因此被罚扣；',
  '如竞拍失败，保证金在1-3工作日内退回。如竞拍成功，保证金会自动转移到法院账户；',
  '按照法院公告中要求的方式支付尾款后，等法院通知或主动联系法院办理后续交割事宜；',
  '点击海豚一键预约，提供实地看样、确认贷款方案、辅助竞拍及过户交割等专属服务。'
];
const TAB_CONTENT_ARR_SECOND_FIRST = [
  '保证金数额由法院在起拍价的百分之五至百分之二十范围内确定，一般在10%左右；',
  '竞买人应当在参加拍卖前以实名交纳保证金，未交纳的，不得参加竞买；',
  '交纳保证金，可以向人民法院指定的账户交纳，也可以通过网络司法拍卖平台缴纳。'
];
const TAB_CONTENT_ARR_THIRD_FIRST = [
  '仔细阅读法院公告；',
  '点击海豚平台预约咨询实地看样；',
  '报名交保证金，拍卖开始以后也可以交保证金；',
  '出价参与竞拍，一般手机、电脑上均可出价；',
  '如竞拍成功，按法院公告中的要求打款给法院，然后可联系法院或等法院联系签署《拍卖成交确认书》，签署后领取《民事裁定书》及《协助执行通知书》等资料，然后即可办理过户；',
  '如竞拍失败，保证金会退还。'
];
const TAB_CONTENT_ARR_FOURTH_FIRST = [
  '拍卖成交后，保证金直接抵扣价款转到法院指定账户；',
  '尾款根据法院公告说明可直接汇款给法院账户或者通过拍卖平台订单转付。'
];
const TAB_CONTENT_ARR_FIRST_SECOND = [
  '目前司法拍卖房产部分是支持贷款的，贷款类型均为商业贷款，暂不支持公积金贷款；',
  '建议至少在开拍前3-5天预约贷款资质预审核；',
  '提前确认审核及放款大致时间及贷款阶段性担保方式；',
  '海豚交易服务中包括贷款，在房源详情页提交预约并备注。'
];
const TAB_CONTENT_ARR_SECOND_SECOND = [
  '拍卖保证金，只要在拍卖结束以前，均可以缴纳，即拍卖如果已经开始，也是可以交保的。',
  '温馨提醒：因保证金金额涉及较高，故建议客户可在提前1-2天缴纳保证金。'
];
const TAB_CONTENT_ARR_THIRD_SECOND = [
  '全场的首次出价只能为起拍价；',
  '加价幅度：只能按加价幅度的整数倍加价；',
  '竞拍周期内，均可出价，次数不限。出价时账户不需要有钱。'
];
const TAB_CONTENT_ARR_FOURTH_SECOND = [
  '竞拍成功后，需按照法院公告中规定的时间支付尾款，尾款支付后，即可联系法院或等法院通知，领取相关材料，自行或委托海豚代理办理缴税过户。',
  '法院需要查询钱款到账情况，一般可在支付后3个工作日左右联系法院办理手续。'
];
const TAB_CONTENT_ARR_FIRST_THIRD = [
  '实地看样是竞买人的法定权利，如果竞买人不实地看样，则代表接受标的物的一切瑕疵，竞买人因未实地查看拍品而产生的法律风险由竞买人自行承担，并不得再以拍品存在实物瑕疵为由提出异议。',
  '温馨提醒：可预约海豚服务商实地看样哟。'
];
const TAB_CONTENT_ARR_SECOND_THIRD = [
  '通过电脑端通过银行卡网银交保时，可以使用家人或朋友的卡。'
];
const TAB_CONTENT_ARR_THIRD_THIRD = [
  '在公告规定的竞拍期限24h（不少于24h）内，随时都可以出价。'
];
const TAB_CONTENT_ARR_FOURTH_THIRD = [
  '《拍卖成交确认书》、《民事裁定书》、《协助执行通知书》及拍卖收款收据等'
];
const TAB_CONTENT_ARR_FIRST_FOURTH = [
  '司法拍卖房产除以下城市外均不限购。',
  '限购城市如下： 北京、广州、深圳、佛山、厦门、济南、南京、石家庄、东莞、珠海、三亚需遵循当地限购政策；嘉兴地区外地户口需遵循当地限购政策；',
  '因各地政策变化，请在竞拍前咨询当地房管局等部门，并以其相关政策为准。'
];
const TAB_CONTENT_ARR_SECOND_FOURTH = [
  '双休日交保受限诸多，到账时效无法保障，建议提前在工作日的时候进行交保，避免影响参拍。'
];
const TAB_CONTENT_ARR_THIRD_FOURTH = [
  '竞价程序结束前五分钟内无人出价的，最后出价即为成交价；有出价的，竞价时间自该出价时点顺延五分钟。竞买人的出价时间以进入网络司法拍卖平台服务系统的时间为准。'
];
const TAB_CONTENT_ARR_FIRST_FIFTH = [
  '司法拍卖房产税费包括买方税费和卖方税费，竞买人参与拍卖之前，需要查看法院公告中，处置单位关于税费由谁承担的说明。'
];
const TAB_CONTENT_ARR_SECOND_FIFTH = [
  '交保成功后，会生成竞买号，则代表交保成功。'
];
const TAB_CONTENT_ARR_THIRD_FIFTH = [
  '司法拍卖房产税费包括买方税费和卖方税费，竞买人参与拍卖之前，需要查看法院公告中，处置单位关于税费由谁承担的说明。'
];
const TAB_CONTENT_ARR_FIRST_SIXTH = [
  '一共5个，淘宝、京东、公拍网、资产诉讼网、中拍网，海豚汇总了5大平台的全部房源。登录海豚选房后点击房源详情页法院公告，可直接跳到对应平台浏览。'
];
const TAB_CONTENT_ARR_THIRD_SIXTH = [
  '可以的。网络司法拍卖不限制竞买人数量。一人参与竞拍，出价不低于起拍价的，即可拍卖成交。如未出价，则不会竞拍成功，拍卖结束后保证金会返回。'
];
const TAB_CONTENT_ARR_FIRST_SEVENTH = [
  '司法拍卖是具有法律严肃性的，不同于商业拍卖。',
  '竞拍成功后保证金会转移到法院指定的账户中，如果竞拍成功后不付余款即视为悔拍。买受人悔拍后保证金不予退还，法院可以裁定重新拍卖。'
];
const TAB_CONTENT_ARR_THIRD_SEVENTH = [
  '优先购买权又称先买权，是指法律赋予特定对象（特定人）依照法律规定或合同约定，在出卖标的物于第三人时，享有的在同等条件下优先于第三人购买的权利。'
];
const TAB_CONTENT_ARR_THIRD_EIGHTH = [
  '有限责任公司的其他股东有优先购买权。',
  '房屋的承租人有优先购买权。',
  '合伙人、财产的按份共有人享有优先购买权。',
  '知识产权法上的优先购买权。包括：委托合同完成的发明，专利申请权归研发人，研发人若转让专利申请权，委托人有优先购买权；职务技术成果的使用权、转让权归单位，单位转让职务技术成果时，完成人有优先购买权；合作技术开发合同完成的发明，专利申请权归合作人共有的，一方转让时，他方有优先购买权。'
];
const TAB_CONTENT_ARR_THIRD_NINETH = [
  '优先购买权人参与竞买的，可以与其他竞买人以相同的价格出价，没有更高出价的，拍卖财产由优先购买权人竞得。',
  '顺序不同的优先购买权人以相同价格出价的，拍卖财产由顺序在先的优先购买权人竞得。',
  '顺序相同的优先购买权人以相同价格出价的，拍卖财产由出价在先的优先购买权人竞得。',
  '优先购买权人经通知未参与竞买的，视为放弃优先购买权。'
];
const TAB_CONTENT_ARR_THIRD_TENTH = [
  '经两次流拍的不动产或者其他财产权，申请执行人或者其他执行债权人拒绝接受或者依法不能接受抵债，人民法院应当决定变卖；',
  '对查封、扣押、冻结的财产，当事人双方及有关权利人同意变卖的，可以变卖。'
];
const TAB_CONTENT_ARR_THIRD_ELEVENTH = [
  '网拍二拍流拍之日起15日内发布网络司法变卖公告。'
];
const TAB_CONTENT_ARR_THIRD_TWELVETH = [
  '网拍变卖期为60天。不动产在变卖期开始15日前公告。'
];
const TAB_CONTENT_ARR_THIRD_THIRTWEENTH = [
  '网络司法变卖的变卖价为网络司法拍卖二拍流拍价。'
];
const TAB_CONTENT_ARR_THIRD_FOURTWEENTH = [
  '竞买人交齐变卖价全款后，取得竞买资格。',
  '如有竞买人在60天内变卖期中的任一时间出价，则变卖自动进入到24小时竞价倒计时；24小时竞价周期内，其他变卖报名用户可加价参与竞买，竞价结束前5分钟内如有人出价，则系统自动向后延时5分钟（循环往复至最后5分钟内无人出价）。'
];
const TAB_CONTENT_ARR_THIRD_FIFTWEENTH = [
  '如果买受人变卖竞买成功后反悔不买，法院将依照法规从变卖预缴款中扣除相应的保证金金额，剩余的钱款退回反悔买受人。'
];
const TAB_CONTENT_ARR_THIRD_SIXTWEENTH = [
  '重新拍卖是指拍卖成交后，发现有下列情形的，人民法院可以决定重新拍卖。',
  '买受人未支付价款致使拍卖目的难以实现的；',
  '竞买人之间恶意串通的；',
  '其他违反有关法律规定应当重新拍卖的。'
];
const TAB_CONTENT_ARR_THIRD_SEVENTWEENTH = [
  '目前法院的竞拍流程分为第一次拍卖，第二次拍卖，变卖。流拍后法院再次上拍一般间隔时间是30天，具体是否上拍以及上拍日期需要跟法院核实。'
];

class Encyclopedia extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '法拍百科',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    headerBackTitle: null,
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View></View>,
  })
  constructor (props) {
    super(props)
    this.state = {
      pageId: 1,
      pageSize: PAGE_SIZE,
      articleArr: [],
      toggleMore: true,
      toggleLoadMore: false,
      tabFirst: 0,
      tabSecond: 0,
      tabThird: 0,
      tabFourth: 0
    }
    this.handleArticleClick = this.handleArticleClick.bind(this)
    this._renderTabFirstHeader = this._renderTabFirstHeader.bind(this)
    this._renderTabSecondHeader = this._renderTabSecondHeader.bind(this)
    this._renderTabThirdHeader = this._renderTabThirdHeader.bind(this)
    this._renderTabFourthHeader = this._renderTabFourthHeader.bind(this)
    this._renderTabFirstContent = this._renderTabFirstContent.bind(this)
    this._renderTabSecondContent = this._renderTabSecondContent.bind(this)
    this._renderTabThirdContent = this._renderTabThirdContent.bind(this)
    this._renderTabFourthContent = this._renderTabFourthContent.bind(this)
    this.getInitArticle = this.getInitArticle.bind(this)
    this.getMoreArticle = this.getMoreArticle.bind(this)
  }
  handleArticleClick (item) {
    const {front_url} = item
    this.props.navigation.navigate('ArticleDetail', {
      front_url
    })
  }
  _renderTabFirstHeader (item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ebedeb",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <Text style={{ fontWeight: "600", color: "#000",fontSize: 14,maxWidth: '90%',lineHeight: 24 }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 14 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 14 }} name="ios-arrow-down" />}
      </View>
    );
  }
  _renderTabSecondHeader (item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ebedeb",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <Text style={{ fontWeight: "600", color: "#000",fontSize: 14,maxWidth: '90%',lineHeight: 24 }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 14 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 14 }} name="ios-arrow-down" />}
      </View>
    );
  }
  _renderTabThirdHeader (item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ebedeb",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <Text style={{ fontWeight: "600", color: "#000",fontSize: 14,maxWidth: '90%',lineHeight: 24 }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 14 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 14 }} name="ios-arrow-down" />}
      </View>
    );
  }
  _renderTabFourthHeader (item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ebedeb",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <Text style={{ fontWeight: "600", color: "#000",fontSize: 14,maxWidth: '90%',lineHeight: 24 }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 14 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 14 }} name="ios-arrow-down" />}
      </View>
    );
  }
  _renderTabFirstContent () {
    switch (this.state.tabFirst) {
      case 0: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_FIRST.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 1: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_SECOND.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 2: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_THIRD.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 3: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_FOURTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 4: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_FIFTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 5: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_SIXTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 6: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FIRST_SEVENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      default: {
        break
      }
    }
  }
  _renderTabSecondContent () {
    switch (this.state.tabSecond) {
      case 0: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_SECOND_FIRST.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 1: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_SECOND_SECOND.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 2: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_SECOND_THIRD.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 3: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_SECOND_FOURTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 4: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_SECOND_FIFTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      default: {
        break
      }
    }
  }
  _renderTabThirdContent () {
    switch (this.state.tabThird) {
      case 0: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_FIRST.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 1: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_SECOND.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 2: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_THIRD.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 3: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_FOURTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 4: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_FIFTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 5: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_SIXTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 6: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_SEVENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 7: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_EIGHTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 8: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_NINETH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 9: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_TENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 10: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_ELEVENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 11: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_TWELVETH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 12: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_THIRTWEENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 13: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_FOURTWEENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 14: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_FIFTWEENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 15: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_SIXTWEENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 16: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_THIRD_SEVENTWEENTH.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      default: {
        break
      }
    }
  }
  _renderTabFourthContent () {
    switch (this.state.tabFourth) {
      case 0: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FOURTH_FIRST.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 1: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FOURTH_SECOND.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      case 2: {
        return (
          <View>
            {
              TAB_CONTENT_ARR_FOURTH_THIRD.map((item, index) => (
                <Text
                  style={{lineHeight: 24,textAlign: 'justify'}}
                  key={index}
                >{item}</Text>
              ))
            }
          </View>
        )
      }
      default: {
        break
      }
    }
  }
  getInitArticle () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const url = `/user/wikiRec?group_id=11&page_id=${this.state.pageId}&page_size=${this.state.pageSize}`
    _fetch.get(url)
      .then(data => {
        if (data.errCode === ERR_OK) {
          this.setState({
            articleArr: data.content,
            toggleMore:  data.content.length < PAGE_SIZE ? false : true
          })
          StatusBar.setNetworkActivityIndicatorVisible(false)
        } else {
          const toast = Toast.show('未知错误>_<', {
            position: 0
          })
          StatusBar.setNetworkActivityIndicatorVisible(false)
        }
      })
  }
  getMoreArticle () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    this.setState({
      pageId: ++this.state.pageId
    }, () => {
      const url = `/user/wikiRec?group_id=11&page_id=${this.state.pageId}&page_size=${this.state.pageSize}`
      _fetch.get(url)
        .then(data => {
          if (data.errCode === ERR_OK) {
            const arr = [...this.state.articleArr]
            arr.push(...data.content)
            this.setState({
              articleArr: arr,
              toggleMore:  data.content.length < PAGE_SIZE ? false : true,
            })
            StatusBar.setNetworkActivityIndicatorVisible(false)
          } else {
            const toast = Toast.show('未知错误>_<', {
              position: 0
            })
            StatusBar.setNetworkActivityIndicatorVisible(false)
          }
        })
    })
  }
  componentDidMount () {
    this.getInitArticle()
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
    this.props._userAddListener()
  }
  componentWillUnmount () {
    this.navListener.remove()
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <Tabs
          renderTabBar={()=> <ScrollableTab />}
        >
          <Tab heading="实时资讯">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.articleArr}
              renderItem={({item}) => (
                <Card
                  style={{marginLeft: 20,marginRight: 20,marginTop: 20,marginBottom: 20}}
                >
                  <CardItem
                    activeOpacity={1}
                    button
                    onPress={() => this.handleArticleClick(item)}
                    cardBody
                    style={{backgroundColor: '#efefef'}}
                  >
                    <Image style={{flex: 1,width: null,height: 160}} source={{uri: item.answer}} />
                  </CardItem>
                  <CardItem
                    activeOpacity={1}
                    button
                    onPress={() => this.handleArticleClick(item)}
                  >
                    <View
                      style={{
                        height: 50,
                        padding: 10,
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <Text numberOfLines={1} style={styles.text}>{item.desc}</Text>
                    </View>
                  </CardItem>
                </Card>
              )}
              keyExtractor={(item) => item.id.toString() }
              onEndReached={() => {
                if (this.state.toggleLoadMore) {
                  this.setState({
                    toggleLoadMore: false
                  })
                  this.getMoreArticle()
                }
              }}
              onEndReachedThreshold={0.5}
              // 解决下拉刷新触发多次问题
              onContentSizeChange={()=>{
                this.setState({
                  toggleLoadMore: true
                })
              }}
              ListFooterComponent={this.state.toggleMore ? <LoadMore /> : <BottomTip isIphoneX={true} />}
            />
          </Tab>
          <Tab heading="拍前须知">
            <View
              style={{flex: 1}}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <Accordion
                  style={{borderWidth: 0,marginTop: 20,marginBottom: TAB_BAR_HEIGHT}}
                  dataArray={TAB_ARRAY_FIRST}
                  animation={true}
                  expanded={0}
                  renderHeader={this._renderTabFirstHeader}
                  contentStyle={{marginRight: 20,marginLeft: 20}}
                  renderContent={() => (
                    <View style={{marginRight: 20,marginLeft: 20}}>
                      {
                        this._renderTabFirstContent()
                      }
                    </View>
                  )}
                  onAccordionOpen={(item, index) => {
                    this.setState({
                      tabFirst: index
                    })
                  }}
                />
              </ScrollView>
            </View>
          </Tab>
          <Tab heading="报名交保">
            <View
              style={{flex: 1}}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <Accordion
                  style={{borderWidth: 0,marginTop: 20,marginBottom: TAB_BAR_HEIGHT}}
                  dataArray={TAB_ARRAY_SECOND}
                  animation={true}
                  expanded={0}
                  renderHeader={this._renderTabSecondHeader}
                  contentStyle={{marginRight: 20,marginLeft: 20}}
                  renderContent={() => (
                    <View style={{marginRight: 20,marginLeft: 20}}>
                      {
                        this._renderTabSecondContent()
                      }
                    </View>
                  )}
                  onAccordionOpen={(item, index) => {
                    this.setState({
                      tabSecond: index
                    })
                  }}
                />
              </ScrollView>
            </View>
          </Tab>
          <Tab heading="竞拍流程">
            <View
              style={{flex: 1}}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <Accordion
                  style={{borderWidth: 0,marginTop: 20,marginBottom: TAB_BAR_HEIGHT}}
                  dataArray={TAB_ARRAY_THIRD}
                  animation={true}
                  expanded={0}
                  renderHeader={this._renderTabThirdHeader}
                  contentStyle={{marginRight: 20,marginLeft: 20}}
                  renderContent={() => (
                    <View style={{marginRight: 20,marginLeft: 20}}>
                      {
                        this._renderTabThirdContent()
                      }
                    </View>
                  )}
                  onAccordionOpen={(item, index) => {
                    this.setState({
                      tabThird: index
                    })
                  }}
                />
              </ScrollView>
            </View>
          </Tab>
          <Tab heading="拍后交割">
            <View
              style={{flex: 1}}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <Accordion
                  style={{borderWidth: 0,marginTop: 20,marginBottom: TAB_BAR_HEIGHT}}
                  dataArray={TAB_ARRAY_FOURTH}
                  animation={true}
                  expanded={0}
                  renderHeader={this._renderTabFourthHeader}
                  contentStyle={{marginRight: 20,marginLeft: 20}}
                  renderContent={() => (
                    <View style={{marginRight: 20,marginLeft: 20}}>
                      {
                        this._renderTabFourthContent()
                      }
                    </View>
                  )}
                  onAccordionOpen={(item, index) => {
                    this.setState({
                      tabFourth: index
                    })
                  }}
                />
              </ScrollView>
            </View>
          </Tab>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  touchWrapper: {
    margin: 20,
    borderRadius: 5,
  },
  img: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  text: {
    fontWeight: 'bold',
    lineHeight: 30,
    fontSize: 16
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _userAddListener () {
    const action = userAddListener('')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Encyclopedia);
