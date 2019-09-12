import React, { Component } from 'react'
import {
  Text,
  View,
  Button
} from 'react-native';

class About extends Component {
  static navigationOptions = {
    header: null
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About Page</Text>
        <Button
          title={'Go To Detail Page'}
          onPress={() => this.props.navigation.navigate('Detail')}
        />
      </View>
    )
  }
}

export default About;
