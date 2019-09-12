import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  RefreshControl
} from 'react-native';

class Service extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false
    }
  }
  loadData () {
    // this.setState({
    //   isLoading: true
    // })
  }
  componentDidMount () {
    const url = 'http://116.62.240.91:3000/house/lists?city_id=1207&page_id=1&type_id=0&page_size=10'
    fetch(url)
      .then(res => res.json())
      .then(resText => {
        this.setState({
          data: [
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]
        })
      })
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          refreshControl={
            <RefreshControl
              title={'下拉刷新'}
              titleColor={'tomato'}
              colors={['tomato']}
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={'tomato'}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default Service;
