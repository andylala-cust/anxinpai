import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  NativeModules,
  RefreshControl,
  SectionList,
  Text
} from 'react-native';
import {HouseList, HouseListPlaceHolder,LoadMore,BottomTip,FilterBar} from '../components/common';
import {HomeMainEntry, HomeSwiper, HomeSearch, HomeSummary} from '../components/home';
import _fetch from '../fetch';
import {queryString} from '../util';
import {PAGE_SIZE,TYPE_ID,PULL_DOWN_REFRESH_DURATION} from '../constants';
import Toast from 'react-native-root-toast';

const JPushModule = NativeModules.JPushModule;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      toggleFirstEnter: true,
      refreshing: false,
      toggleLoadMore: false,
      toggleMore: true,
      bannerList: [],
      recommendList: [],
      listParams: {
        city_id: '',
        page_id: 1,
        page_size: PAGE_SIZE,
        type_id: TYPE_ID,
        time_type: 0,
        bid_time_type: 0,
        price_type: 0,
        cut_type: 0,
        price_min: 0,
        price_max: 0
      },
      summary: {},
      toastVisible: false,
      toastText: '',
      cityName: '上海市'
    }
    this._onRefresh = this._onRefresh.bind(this)
    this.getCurrentCity = this.getCurrentCity.bind(this)
    this.getInitHouseList = this.getInitHouseList.bind(this)
    this.getMoreHouseList = this.getMoreHouseList.bind(this)
    this.getBannerList = this.getBannerList.bind(this)
    this.getSummary = this.getSummary.bind(this)
    this.handleSwiperItemClick = this.handleSwiperItemClick.bind(this)
    this.houseListItemClick = this.houseListItemClick.bind(this)
    this.initJPush = this.initJPush.bind(this)
    this.stickyScroll = this.stickyScroll.bind(this)
    this.filterListParams = this.filterListParams.bind(this)
  }
  stickyScroll (ref, bool) {
    !bool && this._sectionList.scrollToLocation({
      itemIndex: 0
    })
    ref.open()
  }
  _onRefresh () {
    this.setState({
      refreshing: true,
      listParams: {
        ...this.state.listParams,
        page_id: 1
      }
    })
    setTimeout( () => {
      this.getInitHouseList(this.state.listParams)
        .then(() => {
          return new Promise(resolve => {
            this.timer && clearTimeout(this.timer)
            this.setState({
              refreshing: false,
              toastText: '刷新成功^_^',
              toastVisible: true
            })
            resolve()
          })
        })
        .then(() => {
          this.timer = setTimeout(() => {
            this.setState({
              toastVisible: false,
              toastText: ''
            })
          }, 1000)
        })
    }, PULL_DOWN_REFRESH_DURATION)
  }
  getCurrentCity () {
    _fetch.get(`/user/getLocation`)
      .then(data => {
        const cityId = data.content.city_id
        this.setState({
          listParams: {
            ...this.state.listParams,
            city_id: data.content.city_id
          },
          cityName: data.content.city_name
        })
        this.getBannerList(cityId)
        this.getInitHouseList(this.state.listParams)
        this.getSummary(cityId)
        this.getRecommendList(cityId)
      })
  }
  getRecommendList (cityId) {
    const url = `/house/lists?city_id=${cityId}&page_id=${1}&page_size=${10}&type_id=${0}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          recommendList: data.content
        })
      })
  }
  getInitHouseList (param) {
    return new Promise(resolve => {
      const query = queryString.stringify(param)
      const url = `/house/lists?${query}`
      _fetch.get(url)
        .then(data => {
          this.setState({
            data: data.content,
            toggleMore:  data.content.length < PAGE_SIZE ? false : true,
            toggleFirstEnter: false
          })
          resolve()
        })
    })
  }
  getMoreHouseList () {
    this.setState({
      listParams: {
        ...this.state.listParams,
        page_id: ++this.state.listParams.page_id
      }
    })
    const query = queryString.stringify(this.state.listParams)
    const url = `/house/lists?${query}`
    _fetch.get(url)
      .then(data => {
        const arr = [...this.state.data]
        arr.push(...data.content)
        this.setState({
          data: arr,
          toggleMore:  data.content.length < PAGE_SIZE ? false : true
        })
      })
  }
  getBannerList (cityId) {
    const url = `/share/activity/getAd?city_id=${cityId}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          bannerList: data.content
        })
      })
  }
  getSummary (cityId) {
    const url = `/house/get_house_summary?city_id=${cityId}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          summary: data.content
        })
      })
  }
  handleSwiperItemClick (item) {
    alert(item.url)
  }
  houseListItemClick (item) {
    this.props.navigation.navigate('HouseInfo', {
      id: item.id,
      datafrom: item.datafrom
    })
  }
  initJPush () {
    if (Platform.OS == "android") {
      JPushModule.init()
    }else{
      JPushModule.loadJS()
    }
    if (Platform.OS == "android") {
      JPushModule.getRegistrationID((res) => {
        console.log(res)
      })
    } else {
      JPushModule.getRegisterId((res) => {
        console.log(res)
      })
    }
  }
  filterListParams (param) {
    this.setState({
      listParams: {
        ...this.state.listParams,
        ...param
      }
    }, () => {
      this.getInitHouseList(this.state.listParams)
    })
  }
  componentDidMount () {
    this.getCurrentCity()
    this.initJPush()
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <Toast
          visible={this.state.toastVisible}
          position={0}
          shadow={true}
          animation={true}
          hideOnPress={false}
        >
          {this.state.toastText}
        </Toast>
        <HomeSearch cityName={this.state.cityName} />
        <SectionList
          ref={e => {this._sectionList = e}}
          showsVerticalScrollIndicator={false}
          // 当下一个section把它的前一个section的可视区推离屏幕的时候，让这个section的header粘连在屏幕的顶端。这个属性在iOS上是默认可用的，因为这是iOS的平台规范。
          // 安卓需要设置 showsVerticalScrollIndicator 为 true 在有sticky效果
          stickySectionHeadersEnabled={true}
          renderSectionHeader={() => <FilterBar filterListParams={this.filterListParams} stickyScroll={this.stickyScroll} />}
          renderSectionFooter={() => {
            if (!this.state.data.length) {
              if (this.state.toggleFirstEnter)  {
                return <HouseListPlaceHolder />
              }
            }
            if (this.state.data.length < PAGE_SIZE) {
              return  (
                <View>
                  <View style={{marginTop: 20,paddingLeft: 20,paddingRight: 20}}>
                    <View style={{paddingLeft: 10,backgroundColor: '#f0f0f0'}}>
                      <Text style={{height: 40,lineHeight: 40,fontSize: 13}}>筛选条件,发现更多,以下是为你推荐～</Text>
                    </View>
                  </View>
                  {
                    this.state.recommendList.map(item => (
                      <HouseList
                        item={item}
                        navigation={this.props.navigation}
                        callBack={this.houseListItemClick}
                      />
                    ))
                  }
                </View>
              )
            }
          }}
          sections={[{
            data: this.state.data
          }]}
          renderItem={({item}) => (<HouseList
            item={item}
            navigation={this.props.navigation}
            callBack={this.houseListItemClick}
          />)}
          keyExtractor={(item) => item.id.toString()}
          // ListEmptyComponent 在 sectionList 中不起作用，是个 bug
          // 解决方案可用 renderSectionFooter
          // ListEmptyComponent={<HouseListPlaceHolder />}
          ListHeaderComponent={
            <View>
              <HomeMainEntry />
              <HomeSummary {...this.state.summary} />
              <HomeSwiper
                bannerList={this.state.bannerList}
                callBack={this.handleSwiperItemClick}
              />
            </View>
          }
          ListFooterComponent={this.state.toggleMore ? <LoadMore /> : <BottomTip />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          onEndReached={() => {
            if (this.state.toggleLoadMore) {
              this.setState({
                toggleLoadMore: false
              })
              this.getMoreHouseList()
            }
          }}
          onEndReachedThreshold={0.5}
          // 解决下拉刷新触发多次问题
          onContentSizeChange={()=>{
            this.setState({
              toggleLoadMore: true
            })
          }}
        />
      </View>
    )
  }
}

export default Home;
