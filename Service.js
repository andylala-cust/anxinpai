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
import {Badge,Avatar} from 'react-native-elements'

class Service extends Component {
  static navigationOptions = {
    header: null
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Service Page
        </Text>
        <View>
          <Avatar
            rounded
            source={{
              uri: 'http://static.yfbudong.com/cat.png',
            }}
            size="large"
          />
          <Badge
            value={'99'}
            status={'error'}
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
        <Button
          title={'Go To Info Page'}
          onPress={() => this.props.navigation.navigate('Info')}
        />
      </View>
    )
  }
}

export default Service;
