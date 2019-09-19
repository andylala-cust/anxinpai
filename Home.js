import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';

let self;

function RenderItem (item) {
  return (
    // View不支持onPress，所以套一层TouchableOpacity
    <TouchableOpacity
      onPress={() => self.props.navigation.navigate('HouseInfo', {
        id: item.id,
        datafrom: item.datafrom
      })}
      activeOpacity={1}
    >
      <View
        style={{paddingLeft: 20, paddingRight: 20}}
      >
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f1f1f1'}}>
          <Image
            style={{width: '30%', height: 80}}
            source={{uri: item.pic_url}}
          />
          <View
            style={{width: '70%', paddingLeft: 20}}
          >
            <View>
              <Text
                style={{height: 20, fontWeight: 'bold', fontSize: 15, lineHeight: 20}}
                numberOfLines={1}
              >{item.title}</Text>
            </View>
            <View
              style={{flexDirection: 'row'}}
            >
              <Text style={{height: 20, fontSize: 12, lineHeight: 20, color: '#a6abb3'}}>{item.area}m²</Text>
              <Text style={{height: 20, marginLeft: 10, fontSize: 12, lineHeight: 20, color: '#a6abb3'}}>{item.floor}楼</Text>
              <Text style={{height: 20, marginLeft: 10, fontSize: 12, lineHeight: 20, color: '#a6abb3'}}>{item.community_name}</Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 4}}
            >
              <Text style={{height: 16, paddingLeft: 6, paddingRight: 6, backgroundColor: '#eef0f3', fontSize: 12, lineHeight: 16, color: '#7a8fbd', borderRadius: 3}}>{item.cut || '- -'}折</Text>
              <Text style={{height: 16, paddingLeft: 6, paddingRight: 6, backgroundColor: '#eef0f3', marginLeft: 10, fontSize: 12, lineHeight: 16, color: '#7a8fbd', borderRadius: 3}}>{item.circ}</Text>
              <Text style={{height: 16, paddingLeft: 6, paddingRight: 6, backgroundColor: '#eef0f3', marginLeft: 10, fontSize: 12, lineHeight: 16, color: '#7a8fbd', borderRadius: 3}}>{item.asset_type}</Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 6}}
            >
              <Text style={{height: 14, lineHeight: 14, color: '#f00', fontSize: 13}}>{Math.floor(item.initialPrice / 10000)}万</Text>
            </View>
          </View>
        </View>
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
    self = this
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
        this.setState({
          data: resText.content
        })
      })
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={'default'}
          androidtranslucent={true}
        />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => RenderItem(item)}
          keyExtractor={(item) => item.id.toString() }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (<View style={{height: 300,backgroundColor: '#f00'}}></View>)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default Home;
