import React, {Component} from 'react';
import {View,Text} from 'react-native';

const defaultStyle = {
  height: 14,
  backgroundColor: '#f8f8f8'
}

class Split extends Component {
  render () {
    return (
      <View
        style={{
          height: this.props.height || defaultStyle.height,
          backgroundColor: this.props.color || defaultStyle.backgroundColor
        }}
      ></View>
    )
  }
};

export default Split;
