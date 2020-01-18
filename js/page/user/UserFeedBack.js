import React,{Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Accordion, Icon} from 'native-base';
import {IS_IPHONEX} from '../../util';
import LinearGradient from "react-native-linear-gradient";
import {connect} from 'react-redux';
import {userAddListener} from '../../action/user/actionCreators';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;
const dataArray = [
  {
    title: "Q:什么是法拍房？",
  },
  {
    title: "Q:哪些用户适合买法拍房",
  },
  {
    title: "Q:法拍房有哪些优势呢？",
  },
  {
    title: "Q:法拍房和二手房有哪些区别？产权是否不同？",
  },
  {
    title: "Q:法拍房这么好，有没有什么潜在风险呢？",
  },
  {
    title: "Q:如何降低法拍房购买的风险？",
  },
  {
    title: "Q:元沣不动这家公司是做什么的？",
  },
  {
    title: "Q:有多少房子需要清场？概率是多少？",
  },
  {
    title: "Q:一般清场需要多长时间？",
  },
  {
    title: "Q:法拍房价格认定方法？",
  }
];
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class UserFeedBack extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '帮助反馈',
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
      index: 0,
    }
  }
  _renderHeader(item, expanded) {
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
        <Text style={{ fontWeight: "600", color: "#000",fontSize: 14 }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 14 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 14 }} name="ios-arrow-down" />}
      </View>
    );
  }
  _renderContent () {
    switch (this.state.index) {
      case 0:
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:法院拍卖的房产简称，遭法院强制执行拍卖的房屋。当债务人（业主）无力履行按揭合约或无法清偿债务时，而被债权人经由各种司法程序向法院声请强制执行，将债务人名下房屋拍卖，以拍卖所得资金偿还债权。而在过程中遭到拍卖的房子就是所谓的法拍房。</Text>
        )
      case 1:
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:1、破限购用户，除北京、深圳等少数城市外，法拍房是不纳入限购范围的； 2、投资型用户，法拍房平均在市场价格的8折左右</Text>
        )
      case 2:
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:1.起拍价低
            一般情况下，法拍房的评估价值是按照当时抵押的时间的评估价值计算，因此评估价一般是几年前的价格，评估比较低，起拍价也比较低。这就给房价留足了想象空间。

            2.法拍房不限购
            目前只有北京地区和极个别地区将法拍房列入限购范围，其他地区不限购；比如一房难求的上海，杭州，苏州，海南都可以在没有当地户口的情况下，购买房子。在中国未来最有希望的城市拥有一套房子这意味着什么不必赘述了吧。

            3.法拍房可以贷款
            尽管法拍房具有特殊性，但是他依然可以像二手房一样，按照市场上贷款利率进行按揭和抵押。

            4.法拍房可落户
            法拍房和正常购买房产一样，可以根据当地的房产落户政策落户！法拍房和其他房产具有同样的权利。</Text>
        )
      case 3:
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:和二手房在产权归属上无任何差别，区别仅限于交易方式不同： 1）要交法院全款（可以垫资） 2）出现纠纷的风险比二手房大，比如需要清场</Text>
        )
      case 4:
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:1.不能过户：部分房产是按揭房，房本和不动产证还没有下来，就暂时没有办法过户。但是只要还完按揭，把相关证件办下来就可以过户了。



            2.无法入住：根据《合同法》，买卖不破租赁，法拍房如果有租约在先，即使拍卖了，仍然无法入住。当然，租约结束或者想办法结束就可以入住了。



            3.存在其他经济纠纷：法拍房是属于被法院查封，原户主存在其他未被发现的经济纠纷，即使拍下了，仍然存在无法过户的情景；



            4.税费高：没有调查清楚该套拍卖房产的上一次交易时间，如果交易期短，存在征收契税、营业税、个人所得税等高额税费的情景；



            5.其他费用高：一般情况下，物业欠费，水电燃气费由买受人承担，可能存在欠费的情况。
          </Text>
        )
      case 5: {
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:1.在购买前做好详细的尽调 2.找到能够为交易提供兜底服务的第三方，比如海豚选房推出的无忧拍</Text>
        )
      }
      case 6: {
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:这是一家表面上做法拍房评级，实际上背地里在偷摸拯救世界的公司ヾ(o◕∀◕)ﾉ </Text>
        )
      }
      case 7: {
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:在发达地区需要清场的概率并不是特别高，但一旦出现风险就是全部购房款的损失。目前我们测算下来平均在15%左右</Text>
        )
      }
      case 8: {
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A:一般情况下1个星期左右知道清场难度，平均两个月可以完成清场</Text>
        )
      }
      case 9: {
        return (
          <Text style={{paddingTop: 5,paddingBottom: 5,lineHeight: 26,textAlign: 'justify'}}>A: 无忧拍中法拍房价格认定方式为以法院评估价和实际成交价两者取其低</Text>
        )
      }
      default:
        return null
    }
  }
  componentDidMount () {
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
        <ScrollView
          style={{marginBottom: TAB_BAR_HEIGHT+50}}
        >
          <StatusBar
            barStyle={BARSTYLE}
            backgroundColor={"transparent"}
            translucent={true}
            // networkActivityIndicatorVisible={true}
          />
          <View style={{position: 'relative',justifyContent: 'center',alignItems: 'center',margin: 20}}>
            <View style={{position: 'absolute',left: 0,top: 15,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb',width: 80}}></View>
            <Text style={{height: 30,lineHeight: 30}}>热门问题</Text>
            <View style={{position: 'absolute',right: 0,top: 15,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb',width: 80}}></View>
          </View>
          <Accordion
            style={{borderWidth: 0}}
            dataArray={dataArray}
            animation={true}
            expanded={0}
            renderHeader={this._renderHeader}
            contentStyle={{marginRight: 20,marginLeft: 20}}
            renderContent={() => (
              <View style={{marginRight: 20,marginLeft: 20}}>
                {
                  this._renderContent()
                }
              </View>
            )}
            onAccordionOpen={(item, index) => {
              this.setState({
                index
              })
            }}
          />
        </ScrollView>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {this.props.navigation.navigate('UserPostFeedBack')}}
          style={styles.button}
        >
          <LinearGradient
            colors={['#f857a6', '#ff5858']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}
          >
            <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 16}}>意见反馈</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT+50,
    paddingTop: 10,
    paddingBottom: TAB_BAR_HEIGHT+10,
    backgroundColor: '#ea7e7d'
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

export default connect(mapStateToProps,mapDispatchToProps)(UserFeedBack);
