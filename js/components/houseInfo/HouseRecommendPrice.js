import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class HouseRecommendPrice extends Component {
  render () {
    return (
      <View>
        <View style={styles.itemWrapper}>
          <View>
            <Text style={styles.text}>目标价</Text>
          </View>
          <View>
            <Text style={styles.text}>{parseInt(this.props.houseProperty.forecast_deal/100)/100 || '-'}万</Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <View>
            <Text style={styles.text}>风险价</Text>
          </View>
          <View>
            <Text style={styles.text}>{parseInt(this.props.houseProperty.forecast_safe/100)/100 || '-'}万</Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <View>
            <Text style={styles.text}>收益空间</Text>
          </View>
          <View>
            <Text style={styles.text}>{parseInt(this.props.houseProperty.forecast_save/100)/100 || '-'}万</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 5,
    paddingBottom: 5
  },
  text: {
    height: 30,
    lineHeight: 30
  }
})

const mapStateToProps = state => ({
  houseProperty: state.houseInfo.houseProperty
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(HouseRecommendPrice);
