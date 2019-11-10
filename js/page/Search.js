import React,{Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import {STATUSBAR_HEIGHT} from '../util';
import {storage} from '../util';
import _fetch from '../fetch';

class Search extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  async handleInputChange (value) {
    const cityId = await storage.getItem('city_id')
    // const url = `/zone/tips?city_id=${cityId}&search=${value}`
    // console.log(url)
    // _fetch.get(url)
    //   .then(data => {
    //     console.log(data)
    //   })
  }
  componentDidMount () {

  }
  render () {
    return (
      <View>
        <View
          style={styles.searchWrapper}
        >
          <TextInput
            ref={f => this._inputRef = f}
            style={styles.input}
            autoCapitalize={'none'}
            placeholder={'请输入小区或街道等ヾ(o◕∀◕)ﾉ'}
            onChangeText={value => this.handleInputChange(value)}
          />
          <TouchableOpacity
            style={{height: 40}}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={{justifyContent: 'center',alignItems: 'center',height: 40,marginLeft: 20,marginRight: 10}}>
              <Text style={{fontWeight: 'bold',fontSize: 15}}>取消</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingTop: STATUSBAR_HEIGHT,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 600,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  }
})

export default Search;
