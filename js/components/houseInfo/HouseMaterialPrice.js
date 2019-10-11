import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Rating} from 'react-native-elements';

class HouseMaterialPrice extends Component {
  render () {
    return (
      <View>
        <View>
          <View>
            <View style={styles.itemWrapper}>
              <Text>房龄</Text>
              <Text>{this.props.houseProperty.build_time}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.age_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>布局</Text>
              <Text>{this.props.houseProperty.design}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.design_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>楼层</Text>
              <Text>{this.props.houseProperty.floor}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.floor_score/20 || 0}
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

export default connect(mapStateToProps,mapDispatchToProps)(HouseMaterialPrice);
