import React,{Component} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

let self;
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
    this.btnPress = this.btnPress.bind(this)
  }
  btnPress () {
    this.props.navigation.goBack()
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
      <View>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _userAddListener () {
    const action = userAddListener('')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Compare);
