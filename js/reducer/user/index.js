import {ADD_LISTENER} from '../../action/user/actiontypes'

const defaultState = {
  listener: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    // this.props.navigation.addListener, 每次进入页面执行函数
    case ADD_LISTENER: {
      return {
        ...state,
        listener: action.value
      }
    }
    default: {
      return state
    }
  }
}
