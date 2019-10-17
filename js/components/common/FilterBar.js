import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SlideModal,Radio} from 'beeshell';
import {STATUSBAR_HEIGHT} from '../../util';
import {DEFAULT_HOUSE_TYPE,COMMON_HOUSE_TYPE,BUSINESS_HOUSE_TYPE,INDUSTRY_HOUSE_TYPE,OTHER_HOUSE_TYPE} from '../../constants';

const {width} = Dimensions.get('window')

class FilterBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      houseType: DEFAULT_HOUSE_TYPE,
      menuIndex: 0
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
                houseType: value
              }, () => {
                this._slideModal.close()
              })
            }}
          >
            <Radio.Item
              value={DEFAULT_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, DEFAULT_HOUSE_TYPE, '不限')
              }}
            />
            <Radio.Item
              value={COMMON_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, COMMON_HOUSE_TYPE, '住宅')
              }}
            />
            <Radio.Item
              value={BUSINESS_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, BUSINESS_HOUSE_TYPE, '商业')
              }}
            />
            <Radio.Item
              value={INDUSTRY_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, INDUSTRY_HOUSE_TYPE, '工业')
              }}
            />
            <Radio.Item
              value={OTHER_HOUSE_TYPE}
              renderItem={(checked) => {
                return this.renderItem(checked, OTHER_HOUSE_TYPE, '其他')
              }}
            />
          </Radio>
        )
      }
      case 1: {
        return (
          <Text>12121</Text>
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
  renderItem (checked, index, label) {
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
            <Text style={[styles.active]}>类型</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
              style={[styles.active]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(1)}>
          <View style={styles.tabItem}>
            <Text>价格</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(2)}>
          <View style={styles.tabItem}>
            <Text>排序</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(3)}>
          <View style={styles.tabItem}>
            <Text>区域</Text>
            <Ionicons
              name={'md-arrow-dropdown'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItemWrapper} onPress={() => this.handleBarClick(4)}>
          <View style={styles.tabItem}>
            <Text>更多</Text>
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
        {/*<Dropdown*/}
        {/*  style={{width,paddingLeft: 20,paddingRight: 20,}}*/}
        {/*  ref={(c) => {*/}
        {/*    this.dropdown = c*/}
        {/*  }}*/}
        {/*  offsetX={0}*/}
        {/*  offsetY={STATUSBAR_HEIGHT+90}*/}
        {/*  cancelable={true}*/}
        {/*  value={this.state.houseType}*/}
        {/*  data={[*/}
        {/*    {*/}
        {/*      label: '不限',*/}
        {/*      value: 0*/}
        {/*    },*/}
        {/*    {*/}
        {/*      label: '住宅',*/}
        {/*      value: 1*/}
        {/*    },*/}
        {/*    {*/}
        {/*      label: '商业',*/}
        {/*      value: 2*/}
        {/*    },*/}
        {/*    {*/}
        {/*      label: '工业',*/}
        {/*      value: 3*/}
        {/*    },*/}
        {/*    {*/}
        {/*      label: '其他',*/}
        {/*      value: 4*/}
        {/*    }*/}
        {/*  ]}*/}
        {/*  onChange={value => {*/}
        {/*    this.setState({*/}
        {/*      houseType: value*/}
        {/*    })*/}
        {/*  }}*/}
        {/*/>*/}
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
