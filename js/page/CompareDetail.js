import React,{Component} from 'react';
import {StatusBar, Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';
import _fetch from '../fetch';
import {IS_IPHONEX} from '../util';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const FOMER_THEME_COLOR = '#ee9ca7';
const LATTER_THEME_COLOR = '#1cefff';
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

class CompareDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '对比详情',
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
  constructor(props) {
    super(props)
    this.state = {
      formerInfo: {},
      latterInfo: {}
    }
    this.getFomerCompare = this.getFomerCompare.bind(this)
    this.getLatterCompare = this.getLatterCompare.bind(this)
  }
  getFomerCompare () {
    const {formerId} = this.props.navigation.state.params
    const url = `/house/compare?house_id=${formerId}&is_extend=0`
    _fetch.get(url)
      .then(data => {
        this.setState({
          formerInfo: data.content[0] || {}
        })
      })
  }
  getLatterCompare () {
    const {latterId} = this.props.navigation.state.params
    const url = `/house/compare?house_id=${latterId}&is_extend=0`
    _fetch.get(url)
      .then(data => {
        this.setState({
          latterInfo: data.content[0] || {}
        })
      })
  }
  componentDidMount () {
    this.getFomerCompare()
    this.getLatterCompare()
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
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <View style={styles.wrapper}>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',flex: 1}}>
            <View style={styles.house}>
              <View style={{width: '100%',height: 100,backgroundColor: '#efefef'}}>
                <Image
                  style={{width: '100%',height: '100%'}}
                  source={{uri: this.state.formerInfo.pic_url}}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{textAlign: 'justify',lineHeight: 20}}><Text style={{color: FOMER_THEME_COLOR,fontWeight: 'bold'}}>【收藏房1】</Text>{this.state.formerInfo.title}</Text>
              </View>
            </View>
            <View>
              <Text style={{color: FOMER_THEME_COLOR,fontWeight: 'bold',fontSize: 20}}>PK</Text>
            </View>
            <View style={styles.house}>
              <View style={{width: '100%',height: 100,backgroundColor: '#efefef'}}>
                <Image
                  style={{width: '100%',height: '100%'}}
                  source={{uri: this.state.latterInfo.pic_url}}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{textAlign: 'justify',lineHeight: 20}}><Text style={{color: LATTER_THEME_COLOR,fontWeight: 'bold'}}>【收藏房2】</Text>{this.state.latterInfo.title}</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 20,borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth}}></View>
          <View style={{marginTop: 20}}>
            <Text style={{fontWeight: 'bold',fontSize: 18,textAlign: 'center'}}>购房价格</Text>
            <View style={{flexDirection: 'row',justifyContent: 'space-around',paddingTop: 20,paddingBottom: 20}}>
              <View style={{justifyContent: 'center',alignItems: 'center',width: 120,height: 120,borderRadius: 60,borderColor: FOMER_THEME_COLOR,borderWidth: StyleSheet.hairlineWidth}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{lineHeight: 24,fontSize: 13}}>评估价</Text>
                  <Text style={{lineHeight: 24,fontSize: 16}}>{parseInt(this.state.formerInfo.forecast_total/100)/100}</Text>
                  <Text style={{lineHeight: 24,fontSize: 13}}>{this.state.formerInfo.price}/㎡</Text>
                </View>
              </View>
              <View style={{justifyContent: 'center',alignItems: 'center',width: 120,height: 120,borderRadius: 60,borderColor: LATTER_THEME_COLOR,borderWidth: StyleSheet.hairlineWidth}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{lineHeight: 24,fontSize: 13}}>评估价</Text>
                  <Text style={{lineHeight: 24,fontSize: 16}}>{parseInt(this.state.latterInfo.forecast_total/100)/100}</Text>
                  <Text style={{lineHeight: 24,fontSize: 13}}>{this.state.latterInfo.price}/㎡</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth}}></View>
          <View style={{paddingTop: 20,paddingBottom: 20}}>
            <Text style={{textAlign: 'center',fontSize: 18,fontWeight: 'bold'}}>拍卖信息比较</Text>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.start_time}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【起拍时间】</Text>
                <Text style={{width: '30%', textAlign: 'right'}}>{this.state.latterInfo.start_time}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.circ}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【拍卖轮次】</Text>
                <Text style={{width: '30%', textAlign: 'right'}}>{this.state.latterInfo.circ}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.cut}折</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【评估价折扣】</Text>
                <Text style={{width: '30%', textAlign: 'right'}}>{this.state.latterInfo.cut}折</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.viewerCount}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【浏览量】</Text>
                <Text style={{width: '30%', textAlign: 'right'}}>{this.state.latterInfo.viewerCount}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.applyCount}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【报名人数】</Text>
                <Text style={{width: '30%',textAlign: 'right'}}>{this.state.latterInfo.applyCount}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
          </View>
          <View style={{paddingTop: 20,paddingBottom: 20}}>
            <Text style={{textAlign: 'center',fontSize: 18,fontWeight: 'bold'}}>房产信息比较</Text>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.zone_name}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【区位】</Text>
                <Text style={{width: '30%',textAlign: 'right'}}>{this.state.latterInfo.zone_name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.area}㎡</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【建筑面积】</Text>
                <Text style={{width: '30%',textAlign: 'right'}}>{this.state.latterInfo.area}㎡</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.floor}层</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【所在楼层】</Text>
                <Text style={{width: '30%',textAlign: 'right'}}>{this.state.latterInfo.floor}层</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.reset}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【占用情况】</Text>
                <Text style={{width: '30%',textAlign: 'right'}}>{this.state.latterInfo.reset}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop: 15,paddingBottom: 15}}>
                <Text style={{width: '30%', textAlign: 'left'}}>{this.state.formerInfo.rent}</Text>
                <Text style={{width: '40%',textAlign: 'center'}}>【租用情况】</Text>
                <Text style={{width: '30%',textAlign: 'right'}}>{this.state.latterInfo.rent}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,height: 5,backgroundColor: FOMER_THEME_COLOR}}></View>
                <View style={{flex: 1,height: 5,backgroundColor: LATTER_THEME_COLOR}}></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: TAB_BAR_HEIGHT
  },
  house: {
    width: '40%'
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

export default connect(mapStateToProps,mapDispatchToProps)(CompareDetail);
