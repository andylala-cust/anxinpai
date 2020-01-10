import React, {Component} from 'react';
import {STATUSBAR_HEIGHT, storage} from '../../util';
import {Text, View, StyleSheet, TouchableOpacity, Image, StatusBar} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {DEFAULT_USER_AVATAR} from '../../constants';
import LinearGradient from "react-native-linear-gradient";

const AVATAR_SIZE = 36;

class HomeSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAvatar: DEFAULT_USER_AVATAR
    }
    this.handleCityClick = this.handleCityClick.bind(this)
  }

  handleCityClick () {
    if (this.props.slideModal) {
      this.props.slideModal.close()
        .then(() => {
          this.props.navigation.navigate('CityList', {transitionType: 'forVertical'})
        })
    } else {
      this.props.navigation.navigate('CityList', {transitionType: 'forVertical'})
    }
  }

  async updateUserAvatar () {
    const userAvatar = await storage.getItem('user_avatar') || DEFAULT_USER_AVATAR
    this.setState({
      userAvatar
    })
  }

  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.updateUserAvatar()
    })
  }

  render () {
    return (
      <LinearGradient
        colors={['#c471ed', '#f64f59']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          paddingTop: STATUSBAR_HEIGHT,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 600,
          backgroundColor: '#fff',
        }}
      >
        <View
          style={styles.searchWrapper}
        >
          <View style={styles.left}>
            <View style={{width: AVATAR_SIZE,backgroundColor: '#f8f8f8',borderRadius: AVATAR_SIZE/2}}>
              <Image
                style={{width: AVATAR_SIZE,height: AVATAR_SIZE,borderRadius: AVATAR_SIZE/2}}
                source={{uri: this.state.userAvatar}}
              />
            </View>
            <View style={{height: 40,justifyContent: 'center',flex: 1}}>
              <Text style={{textAlign: 'center',fontSize: 10,marginBottom: 3,color: '#fff',fontWeight: 'bold'}}>{this.props.weather.weather || '--'}</Text>
              <Text style={{textAlign: 'center',fontSize: 10,color: '#fff',fontWeight: 'bold'}}>{this.props.weather.temperature || '-'}℃</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.mid}
            activeOpacity={1}
            onPress={() => {
              this.props.navigation.navigate('Search')
            }}
          >
            <View
              style={{flexDirection: 'row', alignItems: 'center',height: 26,backgroundColor: '#f1f1f1',}}
            >
              <EvilIcons
                name={'search'}
                size={18}
                style={{marginLeft: 5}}
                color={'#b5b5b5'}
              />
              <View
                style={styles.tipWrapper}
              >
                <Text style={styles.tip}>发现更多>﹏&lt;</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.right}
            onPress={() => this.handleCityClick()}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <MaterialCommunityIcons
                name={'map-marker'}
                size={20}
                style={{color: '#fff'}}
              />
              <Text style={styles.city} numberOfLines={1}>{this.props.cityName}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    // paddingTop: STATUSBAR_HEIGHT,
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 600,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    paddingLeft: 3,
    paddingRight: 3
  },
  mid: {
    width: '50%',
    height: 26,
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#b5b5b5',
    borderRadius: 7,
    overflow: 'hidden'
  },
  tipWrapper: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  tip: {
    color: '#bbb',
    fontSize: 13,
  },
  right: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 3,
    color: '#fff'
  }
})

const mapStateToProps = state => ({
  slideModal: state.common.slideModal
})

export default connect(mapStateToProps)(HomeSearch);
