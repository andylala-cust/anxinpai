import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableOpacity
} from 'react-native';

class Service extends Component {
  static navigationOptions = {
    header: null
  }
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

export default Service;
