import React,{Component} from 'react';
import {
  View,
  SectionList,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import {CITY, IS_IPHONEX, STATUSBAR_HEIGHT, storage} from '../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {changeCity, getHotCityLayout, toggleHomeRefresh} from '../action/common/actionCreators';

const HOT_CITY = [
  {
    cityName: '上海',
    cityId: 1207,
    citySpell: 'SHANGHAI',
    cityFirstLetter: 'S'
  },
  {
    cityName: '北京',
    cityId: 1023,
    citySpell: 'BEIJINg',
    cityFirstLetter: 'B'
  },
  {
    cityName: '苏州',
    cityId: 1221,
    citySpell: 'SUZHOU',
    cityFirstLetter: 'S'
  },
  {
    cityName: '成都',
    cityId: 1036,
    citySpell: 'CHENGDU',
    cityFirstLetter: 'C'
  },
  {
    cityName: '重庆',
    cityId: 1314,
    citySpell: 'CHONGQING',
    cityFirstLetter: 'C'
  },
  {
    cityName: '深圳',
    cityId: 1212,
    citySpell: 'SHENZHEN',
    cityFirstLetter: 'S'
  }
];
const ALPHA_BET_HEIGHT = 20;
const ITEM_HEIGHT = 40;
const SECTION_HEADER_HEIGHT = 26;
const HEIGHT = Dimensions.get('window').height;
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

class CityList extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      searchArr: [],
      toggleSearch: false,
      searchValue: ''
    }
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleHeaderLayout = this.handleHeaderLayout.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.changeCity = this.changeCity.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
    this._renderFooter = this._renderFooter.bind(this)
    this._renderAlphaBet = this._renderAlphaBet.bind(this)
  }
  async handleItemClick (params) {
    await storage.setItem('city_id', params.cityId.toString())
    await storage.setItem('city_name', params.cityName.toString())
    this.setState({
      searchArr: [],
      toggleSearch: false,
      searchValue: ''
    })
    this.props._changeCity()
    this.props._toggleHomeRefresh(true)
    this.props.navigation.goBack()
  }
  handleHeaderLayout (event) {
    this.props._getHotCityLayout(event.nativeEvent.layout.height)
  }
  handleInputChange (value) {
    this.setState({
      searchValue: value
    }, () => {
      let reg = new RegExp(value === '' ? 'xxyy' : value, 'ig')
      let _arr = []
      for (let i in CITY) {
        for (let j = 0; j < CITY[i].data.length; j++) {
          if (
            reg.test(CITY[i].data[j]['cityName']) ||
            reg.test(CITY[i].data[j]['cityFirstLetter']) ||
            reg.test(CITY[i].data[j]['citySpell'])
          ){
            _arr.push(CITY[i].data[j])
          }
        }
      }
      this.setState({
        searchArr: _arr
      })
    })
  }
  async changeCity (params) {
    await storage.setItem('city_id', params.cityId.toString())
    await storage.setItem('city_name', params.cityName.toString())
    this.props._changeCity()
    this.props._toggleHomeRefresh(true)
    this.props.navigation.goBack()
  }
  _renderHeader () {
    return (
      <View style={{padding: 20}} onLayout={event => {this.handleHeaderLayout(event)}}>
        <Text>热门城市</Text>
        <View
          style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap'}}
        >
          {
            HOT_CITY.map((item,index) => (
              <TouchableOpacity
                key={index}
                style={{width: '30%',backgroundColor: '#fff',marginBottom: 10,marginTop: 10}}
                onPress={() => {this.changeCity(item)}}
              >
                <View>
                  <Text style={{textAlign: 'center',height: 26,lineHeight: 26}}>{item.cityName}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
  _renderFooter () {
    return (
      <View style={styles.footer}>
        <View style={{position: 'relative',justifyContent: 'center',alignItems: 'center',marginLeft: 20,marginRight: 20}}>
          <View style={{position: 'absolute',left: 0,top: 15,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb',width: 80}}></View>
          <Text style={{height: 30,lineHeight: 30}}>我是有底线的哟～</Text>
          <View style={{position: 'absolute',right: 0,top: 15,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb',width: 80}}></View>
        </View>
      </View>
    )
  }
  _renderAlphaBet () {
    const arr = []
    CITY.map((item,index) => {
      arr.push(item.title)
    })
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 9,
        height: HEIGHT,
        // height: ALPHA_BET_HEIGHT*arr.length,
      }}>
        <View>
          {
            arr.map((item,index) => (
              <TouchableOpacity
                key={index}
                style={{width: 20,justifyContent: 'center',alignItems: 'center'}}
                onPress={() => {
                  this._sectionList.scrollToLocation({
                    sectionIndex: index,
                    itemIndex: 0,
                    viewPosition: 0
                  })
                }}
              >
                <Text
                  style={{
                    height: ALPHA_BET_HEIGHT,
                    lineHeight: ALPHA_BET_HEIGHT
                  }}
                >{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
  render () {
    return (
      <View
        style={styles.container}
      >
        {
          this._renderAlphaBet()
        }
        <View
          style={styles.searchWrapper}
        >
          {
            !this.state.toggleSearch && <TouchableOpacity
              style={{height: 40,width: 30}}
              onPress={() => this.props.navigation.goBack()}
            >
              <View style={{justifyContent: 'center',alignItems: 'center',height: 40,width: 30,marginRight: 20}}>
                <Ionicons
                  name={'ios-close'}
                  size={34}
                />
              </View>
            </TouchableOpacity>
          }
          <TextInput
            ref={f => this._inputRef = f}
            style={styles.input}
            autoCapitalize={'none'}
            placeholder={'请输入城市名称ヾ(o◕∀◕)ﾉ'}
            value={this.state.searchValue}
            onChangeText={value => this.handleInputChange(value)}
            onFocus={() => {
              this.setState({
                toggleSearch: true
              })
            }}
          />
          {
            this.state.toggleSearch && <TouchableOpacity
              style={{height: 40}}
              onPress={() => {
                this._inputRef.blur()
                this.setState({
                  toggleSearch: false,
                  searchValue: '',
                  searchArr: []
                })
              }}
            >
              <View style={{justifyContent: 'center',alignItems: 'center',height: 40,marginLeft: 20,marginRight: 10}}>
                <Text style={{fontWeight: 'bold',fontSize: 15}}>取消</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
        <SectionList
          ref={c => this._sectionList = c}
          getItemLayout={(data, index) => {
            let sectionIndex = 0
            let offset = this.props.hotCityLayout
            let item = {
              type: 'header'
            }
            for (let i = 0; i < index; ++i) {
              switch (item.type) {
                case 'header': {
                  let sectionData = data[sectionIndex].data
                  offset += SECTION_HEADER_HEIGHT
                  sectionData.length === 0 ? item = {type: 'footer'} : item = {type: 'row', index: 0}
                  break
                }
                case 'row': {
                  let sectionData = data[sectionIndex].data
                  offset += ITEM_HEIGHT
                  ++item.index
                  if (item.index === sectionData.length) {
                    item = {
                      type: 'footer'
                    }
                  }
                  break
                }
                case 'footer': {
                  item = {type: 'header'}
                  ++sectionIndex
                  break
                }
                default: {
                  console.log('err')
                  break
                }
              }
            }
            let length = 0
            switch (item.type) {
              case 'header':
                length = SECTION_HEADER_HEIGHT
                break
              case 'row':
                length = ITEM_HEIGHT
                break
              case 'footer':
                length = 0
                break
              default:
                break
            }
            return {
              length: length,
              offset: offset,
              index
            }
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => this._renderHeader()}
          renderItem={({ item, index, section }) => (
            <TouchableOpacity
              onPress={() => this.changeCity(item)}
            >
              <View style={styles.itemWrapper}>
                <Text key={index} style={styles.item}>{item.cityName}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ListFooterComponent={this._renderFooter()}
          sections={CITY}
          keyExtractor={(item, index) => item + index}
          style={{backgroundColor: '#efefef'}}
        />
        {
          this.state.toggleSearch && <View
            style={styles.searchList}
          >
            <FlatList
              keyboardDismissMode={'on-drag'}
              data={this.state.searchArr}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => this.handleItemClick(item)}
                >
                  <View style={styles.itemWrapper}>
                    <Text key={index} style={styles.item}>{item.cityName}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  sectionHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    backgroundColor: '#efefef',
    height: SECTION_HEADER_HEIGHT,
    lineHeight: SECTION_HEADER_HEIGHT
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  itemWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
  },
  item: {
    height: ITEM_HEIGHT,
    lineHeight: ITEM_HEIGHT
  },
  footer: {
    height: TAB_BAR_HEIGHT+50,
    paddingTop: 10,
    paddingBottom: TAB_BAR_HEIGHT+10,
  },
  searchList: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT+50,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    paddingBottom: TAB_BAR_HEIGHT,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => ({
  hotCityLayout: state.common.hotCityLayout
})

const mapDispatchToProps = dispatch => ({
  _changeCity () {
    const action = changeCity(true)
    dispatch(action)
  },
  _getHotCityLayout (height) {
    const action = getHotCityLayout(height)
    dispatch(action)
  },
  _toggleHomeRefresh (bool) {
    const action = toggleHomeRefresh(bool)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(CityList);
