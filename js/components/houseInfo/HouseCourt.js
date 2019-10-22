import React,{Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import LinearGradient from "react-native-linear-gradient";
import {connect} from 'react-redux';
import {getCourtLayout} from '../../action/houseInfo/actionCreators';

let self;

class HouseCourt extends Component {
  constructor (props) {
    super(props)
    self = this
    this.state = {
      showHouseCourt: false
    }
  }
  handleLayout (event) {
    this.courtLayout = event.nativeEvent.layout
    this.props._getCourtLayout()
  }
  componentDidMount () {
    this.timer = setTimeout(() => {
      this.setState({
        showHouseCourt: true
      })
    }, 1000)
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  render () {
    return (
      <View onLayout={event => this.handleLayout(event)}>
        <View style={{padding: 20,backgroundColor: '#fff'}}>
          <View>
            <Text style={{fontSize: 17,fontWeight: 'bold'}}>法院公告</Text>
          </View>
        </View>
        {
          !this.state.showHouseCourt ? <View style={{backgroundColor: '#fff'}}>
            <Text style={{textAlign: 'center',paddingTop: 10,paddingBottom: 10}}>努力加载中...</Text>
          </View> : <View>
            <WebView
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // 是否禁止webview 滑动，默认 true
              style={{height: 300}}
              source={{html: `${this.props.desc}${this.props.announce}`}}
            />
            <LinearGradient
              colors={['hsla(0,0%,100%,.8)', 'hsla(0,0%,100%,1)']}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 100,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{flex: 1,width: '100%',fontWeight: 'bold',lineHeight: 100,textAlign: 'center'}}
                onPress={this.props.handleWebViewClick}
              >
                查看更多
              </Text>
            </LinearGradient>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _getCourtLayout () {
    const action = getCourtLayout(self.courtLayout.y)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(HouseCourt);
