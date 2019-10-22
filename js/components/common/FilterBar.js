import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SlideModal,Radio} from 'beeshell';
import {STATUSBAR_HEIGHT, storage} from '../../util';
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
import _fetch from '../../fetch';
import {connect} from 'react-redux';
import {userTipChange} from '../../action/user/actionCreators';
import {filterZoneChange,filterSubwayChange,filterSubwayNameChange,toggleScroll} from '../../action/common/actionCreators'

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
      sortType: '',
      city_id: '',
      tabIndex: 0,
      zoneArr: [],
      subwayNameArr: [],
      subwayLineArr: [[]],
      subwayLineIndex: '',
      checkedZoneIndex: '',
      subwayLineNameIndex: ''
    }
    this.getZoneArr = this.getZoneArr.bind(this)
    this.getSubwayArr = this.getSubwayArr.bind(this)
    this.handleBarClick = this.handleBarClick.bind(this)
  }
  getZoneArr () {
    const url = `/zone/infos?city_id=${this.state.city_id}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          zoneArr: data.content
        })
      })
  }
  getSubwayArr () {
    const url = `/zone/subways?city_id=${this.state.city_id}`
    _fetch.get(url)
      .then(data => {
        const arr = []
        const arr_ = []
        for (let key in data.content) {
          arr.push(key)
          arr_.push(data.content[key])
        }
        this.setState({
          subwayNameArr: arr,
          subwayLineArr: arr_
        })
      })
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
                        bid_time_type: 0,
                        price_type: 0,
                        cut_type: 0
                      })
                      break
                    }
                    // 拍卖时间从近到远
                    case 2: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: SORT_BID_TIME_TYPE_ASC,
                        price_type: 0,
                        cut_type: 0
                      })
                      break
                    }
                    // 拍卖时间从远到近
                    case 3: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: SORT_BID_TIME_TIME_DESC,
                        price_type: 0,
                        cut_type: 0
                      })
                      break
                    }
                    // 价格从高到低
                    case 4: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: 0,
                        price_type: SORT_PRICE_TYPE_DESC,
                        cut_type: 0
                      })
                      break
                    }
                    // 价格从低到高
                    case 5: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: 0,
                        price_type: SORT_PRICE_TYPE_ASC,
                        cut_type: 0
                      })
                      break
                    }
                    // 折扣力度从大到小
                    case 6: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: 0,
                        price_type: 0,
                        cut_type: SORT_CUT_TYPE_ASC
                      })
                      break
                    }
                    // 折扣力度从小到大
                    case 7: {
                      this.props.filterListParams({
                        page_id: 1,
                        time_type: 0,
                        bid_time_type: 0,
                        price_type: 0,
                        cut_type: SORT_CUT_TYPE_DESC
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
      case 3: {
        return (
          <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row',width,paddingLeft: 20,paddingRight: 20,maxHeight: 200,overflow: 'hidden'}}>
              <View style={{backgroundColor: '#f8f8f8'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.getZoneArr()
                    this.setState({
                      tabIndex: 0
                    })
                  }}
                >
                  <View>
                    <Text style={[{paddingLeft: 10,paddingRight: 10,lineHeight: 40,height: 40}, !this.state.tabIndex && styles.active]}>区域</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.getSubwayArr()
                    this.setState({
                      tabIndex: 1
                    })
                  }}
                >
                  <View>
                    <Text style={[{paddingLeft: 10,paddingRight: 10,lineHeight: 40,height: 40}, this.state.tabIndex && styles.active]}>地铁</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                {
                  !this.state.tabIndex ? <ScrollView ref={(e) => this.zoneRef = e}>
                      {
                        this.state.zoneArr.map((item,index) => (
                          <TouchableOpacity
                            onPress={() => {
                              this.props._filterSubwayNameChange('')
                              this.props._filterZoneChange(index)
                              this.setState({
                                checkedZoneIndex: index,
                                zoneKind: item.name,
                                subwayLineIndex: '',
                                subwayLineNameIndex: ''
                              }, () => {
                                this._slideModal.close()
                                setTimeout(() => {
                                  this.props.filterListParams({
                                    selectZoneItems: item.zone_id,
                                    subway_id: '',
                                    page_id: 1
                                  })
                                }, DURATION)
                              })
                            }}
                            key={index}
                          >
                            <View style={{paddingLeft: 10,paddingRight: 10}}>
                              <Text style={[{lineHeight: 40,height: 40}, this.state.checkedZoneIndex === index && styles.active]}>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      }
                    </ScrollView> :
                    <View style={{flexDirection: 'row'}}>
                      {
                        <View style={{flex: 1}}>
                          <ScrollView ref={(e) => this.subwayLineRef = e}>
                            {
                              this.state.subwayNameArr.map((item,index) => (
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      subwayLineIndex: index,
                                      subwayLineNameIndex: ''
                                    })
                                  }}
                                  key={index}
                                >
                                  <View>
                                    <Text style={[{lineHeight: 40, paddingLeft: 10, paddingRight: 10}, this.state.subwayLineIndex === index && styles.active]}>{item}</Text>
                                  </View>
                                </TouchableOpacity>
                              ))
                            }
                          </ScrollView>
                        </View>
                      }
                      {
                        this.state.subwayLineArr[this.state.subwayLineIndex] &&
                        <View style={{flex: 1}}>
                          <ScrollView ref={(e) => this.subwayNameRef = e}>
                            {
                              this.state.subwayLineArr[this.state.subwayLineIndex].map((item,index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    this.props._filterZoneChange('')
                                    this.props._filterSubwayChange(this.state.subwayLineIndex)
                                    this.props._filterSubwayNameChange(index)
                                    this.setState({
                                      subwayLineNameIndex: index,
                                      zoneKind: item.name,
                                      checkedZoneIndex: ''
                                    }, () => {
                                      this._slideModal.close()
                                      setTimeout(() => {
                                        this.props.filterListParams({
                                          selectZoneItems: '',
                                          page_id: 1,
                                          subway_id: item.id
                                        })
                                      }, DURATION)
                                    })
                                  }}
                                >
                                  <View>
                                    <Text numberOfLines={1} style={[{height: 40,lineHeight: 40, paddingLeft: 10, paddingRight: 10}, this.state.subwayLineNameIndex === index && styles.active]}>{item.name}</Text>
                                  </View>
                                </TouchableOpacity>
                              ))
                            }
                          </ScrollView>
                        </View>
                      }
                    </View>
                }
              </View>
            </View>
            <TouchableHighlight
              underlayColor={'rgba(0,106,255,.85)'}
              style={{marginTop: 20,marginLeft: 20,marginRight: 20,marginBottom: 20,backgroundColor: '#006aff'}}
              onPress={() => {
                this.props._filterZoneChange('')
                this.props._filterSubwayChange('')
                this.props._filterSubwayNameChange('')
                this.setState({
                  checkedZoneIndex: '',
                  zoneKind: ZONE_KIND
                }, () => {
                  this._slideModal.close()
                  setTimeout(() => {
                    this.props.filterListParams({
                      selectZoneItems: '',
                      page_id: 1,
                      subway_id: ''
                    })
                  }, DURATION)
                })
              }}
            >
              <View>
                <Text style={{height: 34,lineHeight: 34,textAlign: 'center',color: '#fff'}}>重置</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
      default: {
        return null
      }
    }
  }
  handleBarClick (index) {
    if (index === 3) {
      this.getZoneArr()
    }
    this.filterRef.measure((x, y, width, height, px, py) => {
      this.setState({
        menuIndex: index
      }, () => {
        this.props.stickyScroll(this._slideModal, Math.round(py) === 50+STATUSBAR_HEIGHT)
      })
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
  componentDidMount () {
    storage.getItem('city_id').then(data => {
      this.setState({
        city_id: data || 1207
      })
    })
  }
  render () {
    return (
      <View style={styles.wrapper} ref={e => this.filterRef = e}>
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
            <Text numberOfLines={1} style={(this.props.checkedZoneIndex || this.props.checkedZoneIndex === 0 || this.props.subwayLineNameIndex || this.props.subwayLineNameIndex === 0) && styles.active}>{this.state.zoneKind}</Text>
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
          onOpen={() => {
            if (this.props.checkedZoneIndex || this.props.checkedZoneIndex === 0) {
              this.setState({
                tabIndex: 0
              })
            }
            if (this.props.subwayLineNameIndex || this.props.subwayLineNameIndex === 0) {
              this.setState({
                tabIndex: 1
              })
            }
          }}
          onOpened={() => {
            this.zoneRef && this.zoneRef.scrollTo({
              y: this.props.checkedZoneIndex * 40
            })
            this.subwayLineRef && this.subwayLineRef.scrollTo({
              y: this.props.subwayLineIndex * 40
            })
            this.subwayNameRef && this.subwayNameRef.scrollTo({
              y: this.props.subwayLineNameIndex * 40
            })
            this.props._toggleScroll(false)
          }}
          onClosed={() => {
            this.setState({
              subwayLineIndex: this.props.subwayLineIndex,
              subwayLineNameIndex: this.props.subwayLineNameIndex
            })
            this.props._toggleScroll(true)
          }}
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

const mapStateToProps = state => ({
  checkedZoneIndex: state.common.checkedZoneIndex,
  subwayLineIndex: state.common.subwayLineIndex,
  subwayLineNameIndex: state.common.subwayLineNameIndex
})

const mapDispatchToProps = dispatch => ({
  _filterZoneChange (index) {
    const action = filterZoneChange(index)
    dispatch(action)
  },
  _filterSubwayChange (index) {
    const action = filterSubwayChange(index)
    dispatch(action)
  },
  _filterSubwayNameChange (index) {
    const action = filterSubwayNameChange(index)
    dispatch(action)
  },
  _toggleScroll (bool) {
    const action = toggleScroll(bool)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(FilterBar);
