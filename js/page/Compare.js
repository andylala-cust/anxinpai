import React,{Component} from 'react';
import {StatusBar, TouchableOpacity, View, Text, FlatList, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Segment,Button,Tabs,Tab,TabHeading,Icon} from 'native-base';
import {PAGE_SIZE} from '../constants';
import {ERR_OK} from '../errCode';
import {IS_IPHONEX, storage} from '../util';
import _fetch from '../fetch';
import {BottomTip, EmptyContent, HouseList, LoadMore} from '../components/common';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from "react-native-root-toast";

let self;
const BUTTON_CHECKED = 2;
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;
const CHECK_ICON_NAME = 'check-circle';
const UNCHECK_ICON_NAME = 'checkbox-blank-circle-outline';
const CHECK_ICON_NAME_COLOR = '#006aff';
const UNCHECK_ICON_NAME_COLOR = '#bbb';
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#5186ec" />
);

class Compare extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '对比',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    headerBackTitle: null,
    // 解决左边有按钮，右边无按钮标题不居中
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="back" iconName="md-arrow-back" onPress={() => self.btnPress()} />
      </HeaderButtons>
    ),
    headerRight: <View></View>
  })
  constructor (props) {
    super(props)
    self = this
    this.state = {
      toggleFirstIn: true,
      pageSize: PAGE_SIZE,
      lovePageId: 1,
      notifyPageId: 1,
      loveData: [],
      notifyData: [],
      toggleLoveMore: true,
      toggleNotifyMore: true,
      toggleLoveLoadMore: false,
      toggleNotifyLoadMore: false,
      loveCheckArr: [],
      notifyCheckArr: []
    }
    this.handleLoveCheck = this.handleLoveCheck.bind(this)
    this.handleNotifyCheck = this.handleNotifyCheck.bind(this)
    this.getInitLoveList = this.getInitLoveList.bind(this)
    this.getInitNotifyList = this.getInitNotifyList.bind(this)
    this.getMoreLoveList = this.getMoreLoveList.bind(this)
    this.getMoreNotifyList = this.getMoreNotifyList.bind(this)
    this.btnPress = this.btnPress.bind(this)
  }
  handleLoveCheck (item) {
    if (this.state.loveCheckArr.indexOf(item.id) === -1) {
      const arr = [...this.state.loveCheckArr]
      arr.push(item.id)
      this.setState({
        loveCheckArr: arr
      })
    } else {
      const index = this.state.loveCheckArr.indexOf(item.id)
      const arr = [...this.state.loveCheckArr]
      arr.splice(index, 1)
      this.setState({
        loveCheckArr: arr
      })
    }
  }
  handleNotifyCheck (item) {
    if (this.state.notifyCheckArr.indexOf(item.id) === -1) {
      const arr = [...this.state.notifyCheckArr]
      arr.push(item.id)
      this.setState({
        notifyCheckArr: arr
      })
    } else {
      const index = this.state.notifyCheckArr.indexOf(item.id)
      const arr = [...this.state.notifyCheckArr]
      arr.splice(index, 1)
      this.setState({
        notifyCheckArr: arr
      })
    }
  }
  async getInitLoveList () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const userId = await storage.getItem('user_id')
    this.setState({
      lovePageId: 1
    }, () => {
      const url = `/user/getUserLoveList?user_id=${userId}&page_id=${this.state.lovePageId}&page_size=${this.state.pageSize}`
      _fetch.get(url)
        .then(data => {
          StatusBar.setNetworkActivityIndicatorVisible(false)
          this.setState({
            loveData: data.content,
            toggleLoveMore:  data.content.length < PAGE_SIZE ? false : true
          })
        })
    })
  }
  async getInitNotifyList () {
    if (!this.state.toggleFirstIn) return
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const userId = await storage.getItem('user_id')
    this.setState({
      notifyPageId: 1
    }, () => {
      const url = `/user/getUserNotifyList?user_id=${userId}&page_id=${this.state.notifyPageId}&page_size=${this.state.pageSize}`
      _fetch.get(url)
        .then(data => {
          StatusBar.setNetworkActivityIndicatorVisible(false)
          this.setState({
            notifyData: data.content,
            toggleNotifyMore:  data.content.length < PAGE_SIZE ? false : true
          })
        })
    })
  }
  async getMoreLoveList () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const userId = await storage.getItem('user_id')
    this.setState({
      lovePageId: ++this.state.lovePageId
    }, () => {
      const url = `/user/getUserLoveList?user_id=${userId}&page_id=${this.state.lovePageId}&page_size=${this.state.pageSize}`
      _fetch.get(url)
        .then(data => {
          const arr = [...this.state.loveData]
          arr.push(...data.content)
          this.setState({
            loveData: arr,
            toggleLoveMore:  data.content.length < PAGE_SIZE ? false : true,
          })
          StatusBar.setNetworkActivityIndicatorVisible(false)
        })
    })
  }
  async getMoreNotifyList () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const userId = await storage.getItem('user_id')
    this.setState({
      notifyPageId: ++this.state.notifyPageId
    }, () => {
      const url = `/user/getUserNotifyList?user_id=${userId}&page_id=${this.state.notifyPageId}&page_size=${this.state.pageSize}`
      _fetch.get(url)
        .then(data => {
          const arr = [...this.state.notifyData]
          arr.push(...data.content)
          this.setState({
            notifyData: arr,
            toggleNotifyMore:  data.content.length < PAGE_SIZE ? false : true
          })
          StatusBar.setNetworkActivityIndicatorVisible(false)
        })
    })
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  componentDidMount () {
    this.getInitLoveList()
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
          onChangeTab={(tab) => {
            if (tab.i === 1) {
              this.getInitNotifyList().then(() => {
                this.setState({
                  toggleFirstIn: false
                })
              })
            }
          }}
        >
          <Tab
            heading={'收藏'}
            // heading={ <TabHeading><Icon style={{fontSize: 20}} name="ios-heart" /><Text>收藏</Text></TabHeading>}
          >
            <FlatList
              style={{marginBottom: TAB_BAR_HEIGHT+80}}
              showsVerticalScrollIndicator={false}
              data={this.state.loveData}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',flex: 1,paddingLeft: 20,paddingRight: 20}}>
                  <TouchableOpacity
                    onPress={() => this.handleLoveCheck(item)}
                  >
                    <View>
                      <MaterialCommunityIcons
                        name={this.state.loveCheckArr.indexOf(item.id) > -1 ? CHECK_ICON_NAME : UNCHECK_ICON_NAME}
                        size={18}
                        color={this.state.loveCheckArr.indexOf(item.id) > -1 ? CHECK_ICON_NAME_COLOR : UNCHECK_ICON_NAME_COLOR}
                      />
                    </View>
                  </TouchableOpacity>
                  <HouseList
                    item={item}
                    navigation={this.props.navigation}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString() }
              onEndReached={() => {
                if (this.state.toggleLoveLoadMore) {
                  this.setState({
                    toggleLoveLoadMore: false
                  })
                  this.getMoreLoveList()
                }
              }}
              onEndReachedThreshold={0.5}
              // 解决下拉刷新触发多次问题
              onContentSizeChange={()=>{
                this.setState({
                  toggleLoveLoadMore: true
                })
              }}
              ListEmptyComponent={<EmptyContent />}
              ListFooterComponent={this.state.toggleLoveMore ? <LoadMore /> : <BottomTip />}
            />
            <View
              style={styles.btn}
            >
              <Button
                primary
                onPress={() => {
                  const length = this.state.loveCheckArr.length
                  if (length !== BUTTON_CHECKED) {
                    const toast = Toast.show('只能选中两套才能对比哦>_<', {
                      position: 0
                    })
                  } else {
                    const formerId = this.state.loveCheckArr[0]
                    const latterId = this.state.loveCheckArr[1]
                    this.props.navigation.navigate('CompareDetail', {
                      formerId,
                      latterId
                    })
                  }
                }}
                disabled={this.state.loveCheckArr.length < BUTTON_CHECKED}
                style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}
              >
                <Text style={{color: '#fff',fontWeight: 'bold'}}>选中两套，开始对比</Text>
              </Button>
            </View>
          </Tab>
          <Tab
            heading={'提醒'}
            // heading={ <TabHeading><Icon style={{fontSize: 18}} type={'FontAwesome'} name="bell" /><Text>提醒</Text></TabHeading>}
          >
            <FlatList
              style={{marginBottom: TAB_BAR_HEIGHT+80}}
              showsVerticalScrollIndicator={false}
              data={this.state.notifyData}
              renderItem={({item}) => (
                <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',flex: 1,paddingLeft: 20,paddingRight: 20}}>
                  <TouchableOpacity
                    onPress={() => this.handleNotifyCheck(item)}
                  >
                    <View>
                      <MaterialCommunityIcons
                        name={this.state.notifyCheckArr.indexOf(item.id) > -1 ? CHECK_ICON_NAME : UNCHECK_ICON_NAME}
                        size={18}
                        color={this.state.notifyCheckArr.indexOf(item.id) > -1 ? CHECK_ICON_NAME_COLOR : UNCHECK_ICON_NAME_COLOR}
                      />
                    </View>
                  </TouchableOpacity>
                  <HouseList
                    item={item}
                    navigation={this.props.navigation}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString() }
              onEndReached={() => {
                if (this.state.toggleNotifyLoadMore) {
                  this.setState({
                    toggleNotifyLoadMore: false
                  })
                  this.getMoreNotifyList()
                }
              }}
              onEndReachedThreshold={0.5}
              // 解决下拉刷新触发多次问题
              onContentSizeChange={()=>{
                this.setState({
                  toggleNotifyLoadMore: true
                })
              }}
              ListEmptyComponent={<EmptyContent />}
              ListFooterComponent={this.state.toggleNotifyMore ? <LoadMore /> : <BottomTip />}
            />
            <View
              style={styles.btn}
            >
              <Button
                primary
                onPress={() => {
                  const length = this.state.notifyCheckArr.length
                  if (length !== BUTTON_CHECKED) {
                    const toast = Toast.show('只能选中两套才能对比哦>_<', {
                      position: 0
                    })
                  } else {
                    const formerId = this.state.notifyCheckArr[0]
                    const latterId = this.state.notifyCheckArr[1]
                    this.props.navigation.navigate('CompareDetail', {
                      formerId,
                      latterId
                    })
                  }
                }}
                disabled={this.state.notifyCheckArr.length < BUTTON_CHECKED}
                style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}
              >
                <Text style={{color: '#fff',fontWeight: 'bold'}}>选中两套，开始对比</Text>
              </Button>
            </View>
          </Tab>
        </Tabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT+80,
    paddingTop: 10,
    paddingBottom: TAB_BAR_HEIGHT+10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset:{
          width: 0,
          height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      }
    })
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

export default connect(mapStateToProps,mapDispatchToProps)(Compare);
