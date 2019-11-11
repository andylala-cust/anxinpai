import React,{Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import _fetch from '../../fetch';
import {PAGE_SIZE} from '../../constants';
import {connect} from 'react-redux';
import {userAddListener} from '../../action/user/actionCreators';
import {IS_IPHONEX, storage} from '../../util';
import {HouseList, BottomTip, EmptyContent, LoadMore} from '../../components/common';
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from "react-native-root-toast";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'native-base';
import {ERR_OK} from '../../errCode';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#5186ec" />
);
const IoniconsHeaderButton_ = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={AntDesign} iconSize={22} color="#5186ec" />
);
let self;

class UserNotify extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '我的提醒',
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton_}>
        <Item title="edit" iconName={navigation.state.params.toggleEdit ? 'check' : 'edit'} onPress={() => self.editPress()} />
      </HeaderButtons>
    ),
  })
  constructor (props) {
    super(props)
    self = this
    this.state = {
      pageId: 1,
      pageSize: PAGE_SIZE,
      data: [],
      toggleLoadMore: false,
      toggleEdit: false,
      toggleAll: false,
      toggleMore: true,
      disableLeftSwipe: false
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    this.editPress = this.editPress.bind(this)
    this.btnPress = this.btnPress.bind(this)
    this.houseListItemClick = this.houseListItemClick.bind(this)
    this.getInitUserNotify = this.getInitUserNotify.bind(this)
    this.getMoreUserNotify = this.getMoreUserNotify.bind(this)
  }
  async handleDeleteClick (data) {
    const {index} = data
    const url = `/user/houseNotify`
    const userId = await storage.getItem('user_id')
    const {id,auction_start} = data.item
    const params = {
      user_id: userId,
      house_id: id,
      is_notified: 0,
      push_time: auction_start
    }
    _fetch.post(url, params)
      .then(data => {
        if (data.errCode === ERR_OK) {
          const arr = [...this.state.data]
          arr.splice(index, 1)
          this.setState({
            data: arr
          })
          const toast = Toast.show(`删除成功^_^`, {
            position: 0
          })
        } else {
          const toast = Toast.show(`删除失败，请重试>_<`, {
            position: 0
          })
        }
      })
  }
  async deleteAll () {
    const userId = await storage.getItem('user_id')
    const url = `/user/deleteAllUserNotify?user_id=${userId}`
    _fetch.get(url)
      .then(data => {
        if (data.errCode === ERR_OK) {
          const toast = Toast.show(`取消成功^_^`, {
            position: 0
          })
          this.setState({
            toggleEdit: false,
            toggleAll: false
          }, () => {
            this.props.navigation.setParams({
              toggleEdit: this.state.toggleEdit
            })
            this.getInitUserNotify()
          })
        } else {
          const toast = Toast.show(`未知错误，请重试>_<`, {
            position: 0
          })
        }
      })
  }
  async handleItemDelete (data, secId) {
    const url = `/user/houseNotify`
    const userId = await storage.getItem('user_id')
    const {id,auction_start} = data.item
    const params = {
      user_id: userId,
      house_id: id,
      is_notified: 0,
      push_time: auction_start
    }
    _fetch.post(url, params)
      .then(data => {
        if (data.errCode === ERR_OK) {
          const toast = Toast.show(`删除成功^_^`, {
            position: 0
          })
          secId[id].closeRow()
          this.getInitUserNotify()
        } else {
          const toast = Toast.show(`删除失败>_<`, {
            position: 0
          })
        }
      })
  }
  editPress () {
    this.setState({
      toggleEdit: !this.state.toggleEdit,
      disableLeftSwipe: !this.state.disableLeftSwipe
    }, () => {
      this.props.navigation.setParams({
        toggleEdit: this.state.toggleEdit
      })
    })
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  houseListItemClick (item,secId) {
    if (this.state.toggleEdit) return
    if (secId[item.id].isOpen) {
      secId[item.id].closeRow()
    } else {
      this.props.navigation.navigate('HouseInfo', {
        id: item.id,
        datafrom: item.datafrom
      })
    }
  }
  async getInitUserNotify () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const userId = await storage.getItem('user_id')
    this.setState({
      pageId: 1
    }, () => {
      const url = `/user/getUserNotifyList?user_id=${userId}&page_id=${this.state.pageId}&page_size=${this.state.pageSize}`
      _fetch.get(url)
        .then(data => {
          StatusBar.setNetworkActivityIndicatorVisible(false)
          this.setState({
            data: data.content,
            toggleMore:  data.content.length < PAGE_SIZE ? false : true
          })
        })
    })
  }
  async getMoreUserNotify () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const userId = await storage.getItem('user_id')
    this.setState({
      pageId: ++this.state.pageId
    })
    const url = `/user/getUserNotifyList?user_id=${userId}&page_id=${this.state.pageId}&page_size=${this.state.pageSize}`
    _fetch.get(url)
      .then(data => {
        const arr = [...this.state.data]
        arr.push(...data.content)
        this.setState({
          data: arr,
          toggleMore:  data.content.length < PAGE_SIZE ? false : true,
        })
        StatusBar.setNetworkActivityIndicatorVisible(false)
      })
  }
  componentDidMount () {
    this.getInitUserNotify()
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
        <SwipeListView
          style={this.state.toggleEdit && styles.edit}
          data={this.state.data}
          listViewRef={ref => this._swipeListView = ref}
          disableRightSwipe
          disableLeftSwipe={this.state.disableLeftSwipe}
          renderItem={(data, secId, rowId, rowMap) => (
            <View style={{flexDirection: 'row'}}>
              {
                this.state.toggleEdit && <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.handleDeleteClick(data)}
                  style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#fff',padding: 5}}
                >
                  <View>
                    <AntDesign
                      size={20}
                      name={'delete'}
                      color={'#bbb'}
                    />
                  </View>
                </TouchableOpacity>
              }
              <HouseList
                item={data.item}
                navigation={this.props.navigation}
                callBack={() => this.houseListItemClick(data.item,secId)}
              />
            </View>
          )}
          renderHiddenItem={(data, secId, rowId, rowMap) => (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.standaloneRowBack}
              onPress={() => this.handleItemDelete(data, secId)}
            >
              <View style={[styles.standaloneRowBack,{padding: 5}]}>
                <Text></Text>
                <AntDesign
                  size={20}
                  name={'delete'}
                  color={'#fff'}
                />
                {/*<Text style={styles.text}>取消提醒</Text>*/}
              </View>
            </TouchableOpacity>
          )}
          closeOnRowBeginSwipe={true}
          leftOpenValue={70}
          rightOpenValue={-70}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            if (this.state.toggleLoadMore) {
              this.setState({
                toggleLoadMore: false
              })
              this.getMoreUserNotify()
            }
          }}
          onEndReachedThreshold={0.5}
          // 解决下拉刷新触发多次问题
          onContentSizeChange={()=>{
            this.setState({
              toggleLoadMore: true
            })
          }}
          ListEmptyComponent={<EmptyContent />}
          ListFooterComponent={this.state.toggleMore ? <LoadMore /> : <BottomTip isIphoneX={true} />}
        >
          <StatusBar
            barStyle={BARSTYLE}
            backgroundColor={"transparent"}
            translucent={true}
            // networkActivityIndicatorVisible={true}
          />
        </SwipeListView>
        {
          this.state.toggleEdit && <View style={styles.bottomCard}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  toggleAll: !this.state.toggleAll
                })
              }}
            >
              <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                <View>
                  {
                    !this.state.toggleAll ? <MaterialCommunityIcons
                      name={'checkbox-blank-circle-outline'}
                      size={18}
                      color={'#bbb'}
                    /> : <MaterialCommunityIcons
                      name={'check-circle'}
                      size={18}
                      color={'#006aff'}
                    />
                  }
                </View>
                <Text>{this.state.toggleAll ? '取消全选' : '全选'}</Text>
              </View>
            </TouchableOpacity>
            <Button
              disabled={!this.state.toggleAll ? true : false}
              style={{paddingLeft: 40,paddingRight: 40,borderRadius: 5,paddingTop: 0,paddingBottom: 0}}
              onPress={() => this.deleteAll()}
            >
              <Text style={{lineHeight: 40,color: '#fff',fontWeight: 'bold',fontSize: 16}}>取消关注</Text>
            </Button>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  edit: {
    marginBottom: TAB_BAR_HEIGHT+80
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#f00',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default connect(mapStateToProps,mapDispatchToProps)(UserNotify);
