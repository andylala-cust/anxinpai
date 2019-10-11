import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Rating} from 'react-native-elements';

class HouseLocationPrice extends Component {
  render () {
    return (
      <View>
        <View>
          <View>
            <View style={styles.itemWrapper}>
              <Text>位置</Text>
              <Text>{this.props.houseProperty.biz_tag}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.biz_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>交通</Text>
              <Text>{this.props.houseProperty.traffic_tag}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.traffic_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>教育配套</Text>
              <Text>{this.props.houseProperty.education_tag}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.education_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>服务配套</Text>
              <Text>{this.props.houseProperty.service_tag}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.service_score/20 || 0}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>环境</Text>
              <Text>{this.props.houseProperty.environment_tag}</Text>
              <Rating
                imageSize={14}
                readonly
                startingValue={this.props.houseProperty.environment_score/20 || 0}
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

export default connect(mapStateToProps,mapDispatchToProps)(HouseLocationPrice);
