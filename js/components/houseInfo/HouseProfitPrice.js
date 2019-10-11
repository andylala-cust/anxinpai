import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

class HouseProfitPrice extends Component {
  render () {
    return (
      <View>
        <View>
          <View>
            <View style={styles.itemWrapper}>
              <Text>租用情况</Text>
              <EvilIcons
                name={'lock'}
                size={24}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>空置情况</Text>
              <EvilIcons
                name={'lock'}
                size={24}
              />
            </View>
            <View style={styles.itemWrapper}>
              <Text>户口情况</Text>
              <EvilIcons
                name={'lock'}
                size={24}
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

export default connect(mapStateToProps,mapDispatchToProps)(HouseProfitPrice);
