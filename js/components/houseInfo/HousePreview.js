import React,{Component} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from 'react-native';
import {connect} from 'react-redux';
import {hidePreview} from '../../action/houseInfo/actionCreators';

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
        />
      </Modal>
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
