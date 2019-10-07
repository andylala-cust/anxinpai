import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  NativeModules,
  ScrollView,
} from 'react-native';
import HouseList from '../components/common/HouseList';
import HomeMainEntry from '../components/home/HomeMainEntry';
import HomeSwiper from '../components/home/HomeSwiper';
import HomeSearch from '../components/home/HomeSearch';
import HouseListPlaceHolder from '../components/common/HouseListPlaceHolder';
import {ERR_OK} from '../errCode';

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
      isLoading: false,
      bannerList: [],
    }
    this.getInitHouseList = this.getInitHouseList.bind(this)
    this.handleSwiperItemClick = this.handleSwiperItemClick.bind(this)
    this.houseListItemClick = this.houseListItemClick.bind(this)
  }
  getInitHouseList () {
    const url = 'http://116.62.240.91:3000/house/lists?city_id=1207&page_id=1&type_id=0&page_size=10'
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(resText => {
        if (resText.errCode === ERR_OK) {
          this.setState({
            data: resText.content
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  getBannerList () {
    const url = `http://116.62.240.91:3000/share/activity/getAd?city_id=1207`
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(resText => {
        if (resText.errCode === ERR_OK) {
          this.setState({
            bannerList: resText.content
          })
        }
      })
      .catch(err => {
        console.log(err)
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
  componentDidMount () {
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
    this.getInitHouseList()
    this.getBannerList()
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <HomeSearch />
        <ScrollView>
          <HomeMainEntry />
          <HomeSwiper
            bannerList={this.state.bannerList}
            callBack={this.handleSwiperItemClick}
          />
          {
            !this.state.data.length ? <HouseListPlaceHolder/> : this.state.data.map(item => (
              <HouseList
                key={item.id}
                item={item}
                navigation={this.props.navigation}
                callBack={this.houseListItemClick}
              />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home;
