import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#5186ec" />
);

let self;

function RenderItem (item) {
  return (
    <View>
      <Text>{item.title}</Text>
      <Image
        style={{width: 200, height: 150}}
        source={{uri: item.pic_url}}
      />
    </View>
  )
}

class More extends Component {
  static navigationOptions = {
    title: '更多',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center'
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="back" iconName="md-arrow-back" onPress={() => self.btnPress()}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
        <Item title="select" iconName="ios-heart-empty" onPress={() => alert('heart')} />
      </HeaderButtons>
    )
  }
  constructor (props) {
    super(props)
    self = this
    this.state = {
      data: []
    }
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  componentDidMount () {
    const url = 'http://116.62.240.91:3000/house/lists?city_id=1207&page_id=1&type_id=0&page_size=10'
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          data: resText.content
        })
        // this.setState({
        //   data: [
        //     {key: 'Devin'},
        //     {key: 'Dan'},
        //     {key: 'Dominic'},
        //     {key: 'Jackson'},
        //     {key: 'James'},
        //     {key: 'Joel'},
        //     {key: 'John'},
        //     {key: 'Jillian'},
        //     {key: 'Jimmy'},
        //     {key: 'Julie'},
        //   ]
        // })
      })
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => RenderItem(item)}
          keyExtractor={(item) => item.id.toString() }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default More;
