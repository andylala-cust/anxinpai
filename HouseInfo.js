import ParallaxScrollView from 'react-native-parallax-scroll-view';
import React, {Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'

const img = require('./img/cat.png')
const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

class HouseInfo extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <ParallaxScrollView
        backgroundColor="#f5f5f5"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={270}
        stickyHeaderHeight={70}
        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{bottom: 10, left: 20, position: 'absolute', paddingRight: 15}}>
              <Ionicons name="ios-arrow-back" size={26} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {alert('search')}} style={{bottom: 10, right: 20, position: 'absolute', paddingLeft: 15}}>
              <Entypo name="share" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            {/*<TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{bottom: 10, left: 20, position: 'absolute'}}>*/}
            {/*  <Ionicons name="ios-arrow-back" size={25} color="#333" />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={() => {alert('search')}} style={{bottom: 10, right: 20, position: 'absolute'}}>*/}
            {/*  <MaterialIcons name="search" size={25} color="#333" />*/}
            {/*</TouchableOpacity>*/}
          </View>
        )}
        renderBackground={() => (
          <Image
            source={require('./img/cat.png')}
            style={{width: '100%', height: '100%'}}
          />
        )}
        renderForeground={() => (
          <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text></Text>
          </View>
        )}>
        <View style={{}}>
          <Text>Scroll me</Text>
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: '100%',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  },
  fixedSection: {
    width: '100%',
  },
  fixedSectionText: {
    color: '#fff',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  }
});

export default HouseInfo
