import {USER_TIP_CHANGE} from '../../action/user/actiontypes'

const defaultState = {
  tip: 'andylala'
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case USER_TIP_CHANGE: {
      return {
        ...state,
        tip: action.value
      }
    }
    default: {
      return state
    }
  }
}
