import React,{Component} from 'react';
import {Text, View, StyleSheet, Image, Platform, TouchableOpacity} from 'react-native';
import {PressableButton} from '../../components/common';
import {PIC_PICKING} from '../../constants'

class HomePromote extends Component {
  constructor (props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  handleItemClick (item) {
    if (item.house_id) {
      this.props.navigation.navigate('HouseInfo', {
        id: item.house_id,
        datafrom: item.datafrom
      })
    }
  }
  render () {
    return (
      <View style={styles.wrapper}>
        <View>
          <Text style={{fontWeight: 'bold',fontSize: 16,lineHeight: 24,marginBottom: 10}}>安心推荐</Text>
        </View>
        <View style={styles.listWrapper}>
          {!this.props.promoteList.length && <View>
            <Text>该城市暂无推荐房源>_&lt;</Text>
          </View>}
          {
            this.props.promoteList.map(item => (
              <PressableButton
                key={item.id}
                style={styles.listItem}
                onPress={() => this.handleItemClick(item)}
              >
                <View style={styles.container}>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  <View style={styles.houseWrapper}>
                    <View style={styles.imgWrapper}>
                      <Image
                        source={{uri: item.pic_url || PIC_PICKING}}
                        style={{width: '100%',height: '100%'}}
                      />
                    </View>
                    <View style={{}}>
                      <Text style={styles.price}>{Math.floor(item.currentPrice/10000) || '-'}万</Text>
                    </View>
                  </View>
                  <View style={styles.tagWrapper}>
                    <View style={styles.tag}>
                      <Text style={{lineHeight: 24,fontWeight: 'bold',fontSize: 13,color: '#999'}}>推荐理由</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={{lineHeight: 24,fontSize: 13,color: '#999'}} numberOfLines={2}>{item.reason}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -40,
                      height: 40,
                      borderTopWidth: StyleSheet.hairlineWidth,
                      borderTopColor: '#bbb'
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('HomePromoteDetail', {
                        item,
                        transitionType: 'forVertical'
                      })
                    }}
                  >
                    <View>
                      <Text style={{textAlign: 'center', lineHeight: 40,fontSize: 12,color: '#777'}}>查看详细信息</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </PressableButton>
            ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  },
  listWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  listItem: {
    position: 'relative',
    width: '48%',
    // height: 300,
    marginBottom: 10,
    paddingBottom: 40,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset:{
          width: 0,
          height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      }
    }),
    backgroundColor: '#fff'
  },
  container: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  houseWrapper: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    fontSize: 15,
    lineHeight: 22
  },
  imgWrapper: {
    // width: '60%',
    height: 80,
    marginBottom: 20,
    backgroundColor: '#f8f8f8'
  },
  tagWrapper: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  tag: {
    // width: 80
  },
  detail: {
    // flex: 1
  },
  price: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default HomePromote;
