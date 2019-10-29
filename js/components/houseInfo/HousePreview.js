import React,{Component} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal,View,Text,Animated,Easing,TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {hidePreview} from '../../action/houseInfo/actionCreators';
import {IS_IPHONEX} from '../../util';
import Toast from 'react-native-root-toast';

const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 15;

class HousePreview extends Component {
  render () {
    return (
      <Modal
        visible={this.props.previewVisible}
        transparent={true}
        // 处理安卓物理返回
        onRequestClose={() => this.props._hidePreview()}
      >
        <ImageViewer
          index={this.props.previewIndex}
          onClick={() => this.props._hidePreview()}
          imageUrls={this.props.previewList}
          enableSwipeDown={true}
          onSwipeDown={() => this.props._hidePreview()}
          menus={({cancel,saveToLocal})=><Menus cancel={cancel} saveToLocal={saveToLocal}/>}
          // menuContext={{saveToLocal: '保存到相册',cancel: '取消'}}
        />
      </Modal>
    )
  }
}

class Menus extends React.Component {
  constructor(props){
    super(props);
    this.animatedValue = new Animated.Value(0)
  }

  animate=()=>{
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start();
  };

  componentDidMount() {
    this.animate()
  }

  render(){
    const menus = [
      {title:'保存图片',onPress:() => {
        alert('敬请期待^_^')
        this.props.cancel()
      }},
    ];
    const rotate= {
      transform: [
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [150,0]
          })
        }
      ]
    };
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}} onStartShouldSetResponder={this.props.cancel}/>
        <Animated.View style={rotate}>
          {menus.map((a,i)=>{
            return (
              <TouchableHighlight key={i} onPress={a.onPress}>
                <View style={{marginBottom: 1,backgroundColor:'#FFFFFF',paddingVertical: 20}}>
                  <Text style={{textAlign: 'center'}}>{a.title}</Text>
                </View>
              </TouchableHighlight>
            )
          })}
          <TouchableHighlight onPress={this.props.cancel}>
            <View style={{backgroundColor:'#FFFFFF',paddingVertical: 15,paddingBottom: TAB_BAR_HEIGHT}}>
              <Text style={{textAlign: 'center'}}>取消</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  previewList: state.houseInfo.previewList,
  previewVisible: state.houseInfo.previewVisible,
  previewIndex: state.houseInfo.previewIndex
})

const mapDispatchToProps = dispatch => ({
  _hidePreview () {
    const action = hidePreview(false)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(HousePreview);
