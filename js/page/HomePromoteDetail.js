import React,{Component} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, TouchableOpacity,Dimensions} from 'react-native';
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {STATUSBAR_HEIGHT} from '../util';
import {PIC_PICKING} from '../constants';

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#5186ec" />
);
let self;
const FOREGROUND_HEIGHT = 300;
const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 70+STATUSBAR_HEIGHT;

class HomePromoteDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    // title: '',
    // // 解决安卓标题不居中
    // headerTitleStyle:{
    //   flex: 1,
    //   textAlign:'center',
    //   color: '#5186ec'
    // },
    // headerBackTitle: null,
    // // 解决左边有按钮，右边无按钮标题不居中
    // headerLeft: (
    //   <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
    //     <Item title="back" iconName="md-arrow-back" onPress={() => self.btnPress()} />
    //   </HeaderButtons>
    // )
    header: null
  })
  constructor (props) {
    super(props)
    self = this
    this.state = {
      item: {}
    }
    this.btnPress = this.btnPress.bind(this)
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  componentDidMount () {
    this.setState({
      item: this.props.navigation.state.params.item
    })
  }

  render () {
    return (
      <ParallaxScrollView
        backgroundColor={'#fff'}
        contentBackgroundColor={'#fff'}
        headerBackgroundColor="transparent"
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image
              source={{uri: this.state.item.pic_url || PIC_PICKING,
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT}}
            />
          </View>
        )}

        // renderForeground={() => (
        //   <View key="parallax-header" style={ styles.parallaxHeader }>
        //     <Image style={ styles.avatar } source={{
        //       uri: this.state.item.pic_url || DEFAUL_HOUSE_IMG,
        //       width: AVATAR_SIZE,
        //       height: AVATAR_SIZE
        //     }}/>
        //     <Text style={ styles.sectionSpeakerText }>
        //       Talks by Rich Hickey
        //     </Text>
        //     <Text style={ styles.sectionTitleText }>
        //       CTO of Cognitec, Creator of Clojure
        //     </Text>
        //   </View>
        // )}

        // renderStickyHeader={() => (
        //   <View key="sticky-header" style={styles.stickySection}>
        //     <Text style={styles.stickySectionText}>Rich Hickey Talks</Text>
        //   </View>
        // )}

        // renderFixedHeader={() => (
        //   <View style={{
        //     paddingTop: STATUSBAR_HEIGHT,
        //     paddingLeft: 20,
        //     paddingRight: 20,
        //   }}>
        //     <TouchableOpacity
        //       style={{
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         width: 30,
        //         height: 30,
        //         borderRadius: 15,
        //         backgroundColor: 'rgba(84,84,84,.4)'
        //       }}
        //       onPress={() => {
        //         this.props.navigation.goBack()
        //       }}
        //     >
        //       <MaterialIcons
        //         name={'close'}
        //         size={26}
        //         color={'#fff'}
        //       />
        //     </TouchableOpacity>
        //   </View>
        // )}
      >
        <View style={{
          position: 'absolute',
          left: 0,
          top: -PARALLAX_HEADER_HEIGHT+STATUSBAR_HEIGHT,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'rgba(84,84,84,.4)'
            }}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <MaterialIcons
              name={'close'}
              size={26}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{padding: 20}}
        >
          <Text
            style={{fontWeight: 'bold',fontSize: 19,lineHeight: 28}}
          >{this.state.item.title}</Text>
        </View>
        <View
          style={{paddingLeft: 20,paddingRight: 20,paddingBottom: 20}}
        >
          <Text
            style={{color: 'tomato',fontWeight: 'bold',fontSize: 17}}
          >{Math.floor(this.state.item.currentPrice/10000) || '-'}万</Text>
        </View>
        <View
          style={{paddingLeft: 20,paddingRight: 20}}
        >
          <Text
            style={{marginBottom: 5,lineHeight: 24,fontWeight: 'bold',fontSize: 19,color: '#999'}}
          >推荐理由</Text>
          <Text style={{lineHeight: 30,fontSize: 14,color: '#999'}}>{this.state.item.reason}</Text>
        </View>
      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
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
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default HomePromoteDetail;
