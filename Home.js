import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image, StyleSheet,
} from 'react-native';

function RenderItem (item) {
  return (
    <TouchableOpacity
      onPress={() => {
        alert(1)
      }}
    >
      <View>
        <Text>{item.title}</Text>
        <Image
          style={{width: 200, height: 150}}
          source={{uri: item.pic_url}}
        />
      </View>
    </TouchableOpacity>
  )
}

class Home extends Component {
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
      .then(res => (res.json()))
      .then(resText => {
        console.log(resText.content)
        this.setState({
          data: resText.content
        })
      })
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => RenderItem(item)}
          keyExtractor={(item) => item.id.toString() }
          showsVerticalScrollIndicator={false}
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

export default Home;
