import {
  HOUSEINFO_COURT_URl,
  HOUSEINFO_GET_BASE_LAYOUT,
  HOUSEINFO_GET_COURT_LAYOUT,
  HOUSEINFO_GET_AROUND_LAYOUT
} from '../../action/houseInfo/actionTypes'

const defaultState = {
  courtUrl: '',
  baseLayout: 0,
  courtLayout: 0,
  aroundLayout: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case HOUSEINFO_COURT_URl: {
      return {
        ...state,
        courtUrl: action.value
      }
    }
    case HOUSEINFO_GET_BASE_LAYOUT: {
      return {
        ...state,
        baseLayout: action.value
      }
    }
    case HOUSEINFO_GET_COURT_LAYOUT: {
      return {
        ...state,
        courtLayout: action.value
      }
    }
    case HOUSEINFO_GET_AROUND_LAYOUT: {
      return {
        ...state,
        aroundLayout: action.value
      }
    }
    default: {
      return state
    }
  }
}
