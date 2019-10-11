import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Rating} from 'react-native-elements';

class HouseMarketPrice extends Component {
  render () {
    return (
      <View>
        <View>
          <View>
            <View style={styles.itemWrapper}>
              <Text>折价率</Text>
              <Text>{this.props.houseProperty.cut}折</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.cut_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>周边溢价</Text>
              <Text>{Math.round(this.props.houseProperty.premium_ratio*1000)/10}%</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.premium_score/20 || 0}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  }
})

const mapStateToProps = state => ({
  houseProperty: state.houseInfo.houseProperty
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(HouseMarketPrice);
