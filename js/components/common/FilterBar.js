import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SlideModal,Radio} from 'beeshell';
import {STATUSBAR_HEIGHT} from '../../util';
import {
  DEFAULT_HOUSE_TYPE,
  COMMON_HOUSE_TYPE,
  BUSINESS_HOUSE_TYPE,
  INDUSTRY_HOUSE_TYPE,
  OTHER_HOUSE_TYPE,
  SORT_TIME_TYPE,
  SORT_BID_TIME_TYPE_ASC,
  SORT_BID_TIME_TIME_DESC,
  SORT_PRICE_TYPE_DESC,
  SORT_PRICE_TYPE_ASC,
  SORT_CUT_TYPE_ASC,
  SORT_CUT_TYPE_DESC
} from '../../constants';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import Toast from 'react-native-root-toast';

const DURATION  = 300;
const HOUSE_KIND = '类型';
const PRICE_KIND = '价格';
const SORT_KIND = '排序';
const ZONE_KIND = '区域';
const MORE_KIND = '更多';
const HOUSE_TYPE = [HOUSE_KIND, '住宅', '商业', '工业', '其他'];
const PRICE_TYPE = ['200万以下', '200-500万', '500-1000万', '1000万以上'];
const SORT_TYPE = ['排序', '最新发布', '拍卖时间从近到远', '拍卖时间从远到近', '价格从高到低', '价格从低到高', '折扣力度从大到小', '折扣力度从小到大',];
const {width} = Dimensions.get('window');

class FilterBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      houseKind: HOUSE_KIND,
      priceKind: PRICE_KIND,
      sortKind: SORT_KIND,
      zoneKind: ZONE_KIND,
      moreKind: MORE_KIND,
      houseType: '',
      menuIndex: 0,
      priceType: '',
      priceMin: '',
      priceMax: '',
      priceSelected: false,
      sortType: ''
    }
    this.handleBarClick = this.handleBarClick.bind(this)
  }
  renderMenu (index) {
    switch (index) {
      case 0: {
        return (
          <Radio
            style={{width,backgroundColor: '#fff',paddingLeft: 20,paddingRight: 20}}
            value={this.state.houseType}
            onChange={value => {
              this.setState({
                houseType: value,
                houseKind: HOUSE_TYPE[value]
              }, () => {
                this._slideModal.close()
                setTimeout(() => {
                  this.props.filterListParams({
                    type_id: value,
                    page_id: 1
                  })
                }, DURATION)
              })
            }}
          >
            <Radio.Item
              value={DEFAULT_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, '不限')
              }}
            />
            <Radio.Item
              value={COMMON_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, '住宅')
              }}
            />
            <Radio.Item
              value={BUSINESS_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, '商业')
              }}
            />
            <Radio.Item
              value={INDUSTRY_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, '工业')
              }}
            />
            <Radio.Item
              value={OTHER_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, '其他')
              }}
            />
          </Radio>
        )
      }
      case 1: {
        return (
          <View style={{width,backgroundColor: '#fff',padding: 20}}>
            <TouchableOpacity activeOpacity={1} onPress={dismissKeyboard}>
              <View style={{marginBottom: 10}}>
                <Text style={{fontWeight: 'bold',fontSize: 17}}>价格区间(万)</Text>
              </View>
              <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                <TextInput
                  defaultValue={this.state.priceMin}
                  onChangeText={(value) => {this.setState({
                    priceMin: value
                  })}}
                  keyboardType={'numeric'}
                  maxLength={6}
                  placeholder={'最低价格'}
                  placeholderTextColor={'#bbb'}
                  style={{flex: 1,borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,height: 40,fontSize: 16,textAlign: 'center'}}
                />
                <Text>至</Text>
                <TextInput
                  defaultValue={this.state.priceMax}
                  onChangeText={(value) => {this.setState({
                    priceMax: value
                  })}}
                  keyboardType={'numeric'}
                  maxLength={6}
                  placeholder={'最高价格'}
                  placeholderTextColor={'#bbb'}
                  style={{flex: 1,borderBottomColor: '#bbb',borderBottomWidth: StyleSheet.hairlineWidth,height: 40,fontSize: 16,textAlign: 'center'}}
                />
              </View>
              <View>
                <Radio
                  value={this.state.priceType}
                  onChange={value => {
                    this.setState({
                      priceType: value,
                      priceKind: PRICE_TYPE[value],
                      priceMin: '',
                      priceMax: '',
                      priceSelected: true
                    }, () => {
                      this._slideModal.close()
                      setTimeout(() => {
                        switch (value) {
                          // 0-200万
                          case 0: {
                            this.props.filterListParams({
                              page_id: 1,
                              price_min: 0,
                              price_max: 200
                            })
                            break
                          }
                          // 200-500万
                          case 1: {
                            this.props.filterListParams({
                              page_id: 1,
                              price_min: 200,
                              price_max: 500
                            })
                            break
                          }
                          // 500-1000万
                          case 2: {
                            this.props.filterListParams({
                              page_id: 1,
                              price_min: 500,
                              price_max: 1000
                            })
                            break
                          }
                          // 1000万以上
                          case 3: {
                            this.props.filterListParams({
                              page_id: 1,
                              price_min: 1000,
                              price_max: 1000000
                            })
                          }
                          default: {
                            break
                          }
                        }
                      }, DURATION)
                    })
                  }}
                >
                  <Radio.Item
                    value={0}
                    renderItem={(checked) => {
                      return this.renderItem(checked, '200万以下')
                    }}
                  />
                  <Radio.Item
                    value={1}
                    renderItem={(checked) => {
                      return this.renderItem(checked, '200-500万')
                    }}
                  />
                  <Radio.Item
                    value={2}
                    renderItem={(checked) => {
                      return this.renderItem(checked, '500-1000万')
                    }}
                  />
                  <Radio.Item
                    value={3}
                    renderItem={(checked) => {
                      return this.renderItem(checked, '1000万以上')
                    }}
                  />
                </Radio>
              </View>
              <View style={{flexDirection: 'row',borderTopColor: '#bbb',borderTopWidth: StyleSheet.hairlineWidth,paddingTop: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      priceType: '',
                      priceKind: PRICE_KIND,
                      priceMin: '',
                      priceMax: '',
                      priceSelected: false
                    }, () => {
                      this._slideModal.close()
                      setTimeout(() => {
                        this.props.filterListParams({
                          page_id: 1,
                          price_min: 0,
                          price_max: 0
                        })
                      }, DURATION)
                    })
                  }}
                  style={{justifyContent: 'space-between',alignItems: 'center'}}
                >
                  <AntDesign
                    name={'reload1'}
                  />
                  <Text>重置</Text>
                </TouchableOpacity>
                <TouchableHighlight
                  underlayColor={'rgba(0,106,255,.85)'}
                  onPress={() => {
                    if (!this.state.priceMin || !this.state.priceMax) {
                      const toast = Toast.show('请输入最低价格和最高价格^_^', {
                        position: 0
                      })
                      return
                    }
                    if (parseFloat(this.state.priceMin) > parseFloat(this.state.priceMax)) {
                      [this.state.priceMin, this.state.priceMax] = [this.state.priceMax, this.state.priceMin]
                    }
                    this.setState({
                      priceKind: `${this.state.priceMin}-${this.state.priceMax}万`,
                      priceType: '',
                      priceSelected: true
                    }, () => {
                      this._slideModal.close()
                      setTimeout(() => {
                        this.props.filterListParams({
                          page_id: 1,
                          price_min: this.state.priceMin,
                          price_max: this.state.priceMax
                        })
                      }, DURATION)
                    })}
                  }
                  style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginLeft: 20,backgroundColor: '#006aff'}}
                >
                  <View>
                    <Text style={{color: '#fff',height: 34,lineHeight: 34}}>确定</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
      case 2: {
        return (
          <Radio
            value={this.state.sortType}
            style={{width,backgroundColor: '#fff',paddingLeft: 20,paddingRight: 20}}
            onChange={value => {
              this.setState({
                sortType: value,
                sortKind: SORT_TYPE[value]
              }, () => {
                this._slideModal.close()
                setTimeout(() => {
                  switch (value) {
                    // 默认排序
                    case 0: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: 0,
                        price_type: 0,
                        cut_type: 0
                      })
                      break
                    }
                    // 最新发布
                    case 1: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: SORT_TIME_TYPE,
                      })
                      break
                    }
                    // 拍卖时间从近到远
                    case 2: {
                      this.props.filterListParams({
                        page_id: 1,
                        bid_time_type: SORT_BID_TIME_TYPE_ASC,
                      })
                      break
                    }
                    // 拍卖时间从远到近
                    case 3: {
                      this.props.filterListParams({
                        page_id: 1,
                        bid_time_type: SORT_BID_TIME_TIME_DESC,
                      })
                      break
                    }
                    // 价格从高到低
                    case 4: {
                      this.props.filterListParams({
                        page_id: 1,
                        price_type: SORT_PRICE_TYPE_DESC,
                      })
                      break
                    }
                    // 价格从低到高
                    case 5: {
                      this.props.filterListParams({
                        page_id: 1,
                        price_type: SORT_PRICE_TYPE_ASC,
                      })
                      break
                    }
                    // 折扣力度从大到小
                    case 6: {
                      this.props.filterListParams({
                        page_id: 1,
                        cut_type: SORT_CUT_TYPE_ASC,
                      })
                      break
                    }
                    // 折扣力度从小到大
                    case 7: {
                      this.props.filterListParams({
                        page_id: 1,
                        cut_type: SORT_CUT_TYPE_DESC,
                      })
                      break
                    }
                    default: {
                      break
                    }
                  }
                }, DURATION)
              })
            }}
          >
            <Radio.Item
              value={0}
              renderItem={(checked) => {
                return this.renderItem(checked, '默认排序')
              }}
            />
            <Radio.Item
              value={1}
              renderItem={(checked) => {
                return this.renderItem(checked, '最新发布')
              }}
            />
            <Radio.Item
              value={2}
              renderItem={(checked) => {
                return this.renderItem(checked, '拍卖时间从近到远')
              }}
            />
            <Radio.Item
              value={3}
              renderItem={(checked) => {
                return this.renderItem(checked, '拍卖时间从远到近')
              }}
            />
            <Radio.Item
              value={4}
              renderItem={(checked) => {
                return this.renderItem(checked, '价格从高到低')
              }}
            />
            <Radio.Item
              value={5}
              renderItem={(checked) => {
                return this.renderItem(checked, '价格从低到高')
              }}
            />
            <Radio.Item
              value={6}
              renderItem={(checked) => {
                return this.renderItem(checked, '折扣力度从大到小')
              }}
            />
            <Radio.Item
              value={7}
              renderItem={(checked) => {
                return this.renderItem(checked, '折扣力度从小到大')
              }}
            />
          </Radio>
        )
      }
      default: {
        return null
      }
    }
  }
  handleBarClick (index) {
    this.setState({
      menuIndex: index
    }, () => {
      this.props.stickyScroll(this._slideModal)
    })
  }
  renderItem (checked, label) {
    let color = checked ? '#006aff' : '#000'
    return (
      <View style={{ paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {checked ? <Ionicons name={'ios-checkmark'} size={20} color={color} /> : null}
          <Text style={{ fontSize: 14, marginLeft: 8, color }}>{label}</Text>
        </View>
      </View>
    )
  }
  render () {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(0)}>
          <View style={styles.tabItem}>
            <Text style={this.state.houseType ? styles.active : ''} numberOfLines={1}>{this.state.houseKind}</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
              style={this.state.houseType ? styles.active : ''}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(1)}>
          <View style={styles.tabItem}>
            <Text style={this.state.priceSelected ? styles.active : ''} numberOfLines={1}>{this.state.priceKind}</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
              style={this.state.priceSelected ? styles.active : ''}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(2)}>
          <View style={styles.tabItem}>
            <Text style={this.state.sortType ? styles.active : ''} numberOfLines={1}>{this.state.sortKind}</Text>
            <Ionicons
              style={this.state.sortType ? styles.active : ''}
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(3)}>
          <View style={styles.tabItem}>
            <Text numberOfLines={1}>{this.state.zoneKind}</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(4)}>
          <View style={styles.tabItem}>
            <Text numberOfLines={1}>{this.state.moreKind}</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <SlideModal
          ref={(c) => {this._slideModal = c}}
          cancelable={true}
          offsetX={0}
          offsetY={STATUSBAR_HEIGHT+90+StyleSheet.hairlineWidth}
          direction={'down'}
        >
          {this.renderMenu(this.state.menuIndex)}
        </SlideModal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d1d1'
  },
  tabItemWrapper: {
    flex: 1
  },
  tabItem: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  active: {
    color: '#006aff'
  }
})

export default FilterBar;
