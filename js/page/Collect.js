import React, { Component } from 'react'
import {
  Text,
  View,
  Button
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements'

const DEFAULTRATE = 5

class Collect extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      rate: DEFAULTRATE
    }
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>About Page</Text>
        <Button
          title={'Go To Detail Page'}
          onPress={() => this.props.navigation.navigate('Detail')}
        />
        <AirbnbRating
          count={5}
          size={20}
          defaultRating={this.state.rate}
          onFinishRating={(rate) => {
            this.setState({
              rate: rate
            })
          }}
        />
        <Rating
          imageSize={20}
          readonly
          startingValue={this.state.rate}
        />
      </View>
    )
  }
}

export default Collect;
