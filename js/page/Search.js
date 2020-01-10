import React,{Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {IS_IPHONEX, STATUSBAR_HEIGHT} from '../util';
import {storage,debounce} from '../util';
import _fetch from '../fetch';
import {SwipeListView} from 'react-native-swipe-list-view';
import {ERR_OK} from '../errCode';
import Toast from "react-native-root-toast";
import {connect} from 'react-redux';
import {userAddListener} from '../action/user/actionCreators';
import {toggleHomeRefresh,searchChange,searchValue} from '../action/common/actionCreators';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

class Search extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      searchArr: []
    }
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleSearch (event) {
    this.props._searchValue(event.nativeEvent.text)
    this.props._searchChange(true)
    this.props._toggleHomeRefresh(true)
    this.props.navigation.goBack()
  }
  handleItemClick (item) {
    this.props.navigation.navigate('HouseInfo', {
      id: item.s_id,
      datafrom: item.datafrom
    })
  }
  async handleInputChange (value) {
    const cityId = await storage.getItem('city_id')
    const url = `/zone/tips?city_id=${cityId}&search=${value}`
    _fetch.get(url)
      .then(data => {
        if (data.errCode === ERR_OK) {
          this.setState({
            searchArr: data.content
          })
        } else {
          const toast = Toast.show('网络不佳，请重试>_<', {
            position: 0
          })
        }
      })
  }
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
    this.props._userAddListener()
  }
  componentWillUnmount () {
    this.navListener.remove()
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <View
          style={styles.searchWrapper}
        >
          <TextInput
            // 此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数
            onSubmitEditing={(event) => this.handleSearch(event)}
            ref={f => this._inputRef = f}
            style={styles.input}
            autoCapitalize={'none'}
            autoFocus
            placeholder={'找小区、找街道ヾ(o◕∀◕)ﾉ'}
            returnKeyType={'search'}
            onChangeText={debounce((value) => {
              this.handleInputChange(value)
            }, 300)}
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
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{paddingLeft: 20,paddingRight: 20,marginBottom: TAB_BAR_HEIGHT}}
          keyboardDismissMode={'on-drag'}
          data={this.state.searchArr}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => this.handleItemClick(item)}
            >
              <View style={styles.itemWrapper}>
                <Text key={index} style={styles.item}>{item.s_name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3
  },
  itemWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb'
  },
  item: {
    lineHeight: 24
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _userAddListener () {
    const action = userAddListener('')
    dispatch(action)
  },
  _toggleHomeRefresh (bool) {
    const action = toggleHomeRefresh(bool)
    dispatch(action)
  },
  _searchChange (bool) {
    const action = searchChange(bool)
    dispatch(action)
  },
  _searchValue (value) {
    const action = searchValue(value)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(Search);
