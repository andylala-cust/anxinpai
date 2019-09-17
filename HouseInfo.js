import React, { Component } from 'react';
import {View, Text} from 'react-native';

class HouseInfo extends Component {
  componentDidMount () {
    const { id, datafrom } = this.props.navigation.state.params
    const url = `http://116.62.240.91:3000/house/pic?house_id=${id}&datafrom=${datafrom}`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        console.log(resText)
      })
  }

  render () {
    return (
      <View>
        <Text>HouseInfo Page</Text>
      </View>
    )
  }
}

export default HouseInfo;
