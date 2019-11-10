import React,{Component} from 'react';
import {View, StatusBar, FlatList, Text, SectionList} from 'react-native';
import _fetch from '../../fetch';
import {PAGE_SIZE} from '../../constants';
import {connect} from 'react-redux';
import {userAddListener} from '../../action/user/actionCreators';
import {storage} from '../../util';
import {HouseList} from '../../components/common';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class UserNotify extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '我的提醒',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    headerBackTitle: null,
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View></View>,
  })
  constructor (props) {
    super(props)
    this.state = {
      pageId: 1,
      pageSize: PAGE_SIZE,
      data: []
    }
    this.houseListItemClick = this.houseListItemClick.bind(this)
    this.getInitUserNotify = this.getInitUserNotify.bind(this)
  }
  houseListItemClick (item) {
    this.props.navigation.navigate('HouseInfo', {
      id: item.id,
      datafrom: item.datafrom
    })
  }
  async getInitUserNotify () {
    const userId = await storage.getItem('user_id')
    const url = `/user/getUserNotifyList?user_id=${userId}&page_id=${this.state.pageId}&page_size=${this.state.pageSize}`
    _fetch.get(url)
      .then(data => {
        console.log(data)
        this.setState({
          data: data.content
        })
      })
  }
  componentDidMount () {
    this.getInitUserNotify()
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
    this.props._userAddListener()
  }
  componentWillUnmount () {
    this.navListener.remove()
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (<HouseList
            item={item}
            navigation={this.props.navigation}
            callBack={this.houseListItemClick}
          />)}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _userAddListener () {
    const action = userAddListener('')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(UserNotify);
