import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

class Home extends Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Page</Text>
        <Button
          title={'Go To Info Page'}
          onPress={() => this.props.navigation.navigate('Info')}
        />
      </View>
    )
  }
}

export default Home;
