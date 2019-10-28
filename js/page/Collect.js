import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  StatusBar, Platform,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements'

const DEFAULTRATE = 5;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

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
  componentDidMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
  }
  componentWillUnmount() {
    this._navListener.remove()
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/*<Text>About Page</Text>*/}
        {/*<Button*/}
        {/*  title={'Go To Detail Page'}*/}
        {/*  onPress={() => this.props.navigation.navigate('Detail')}*/}
        {/*/>*/}
        {/*<AirbnbRating*/}
        {/*  count={5}*/}
        {/*  size={20}*/}
        {/*  defaultRating={this.state.rate}*/}
        {/*  onFinishRating={(rate) => {*/}
        {/*    this.setState({*/}
        {/*      rate: rate*/}
        {/*    })*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Rating*/}
        {/*  imageSize={20}*/}
        {/*  readonly*/}
        {/*  startingValue={this.state.rate}*/}
        {/*/>*/}
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <Text>敬请期待</Text>
      </View>
    )
  }
}

export default Collect;
