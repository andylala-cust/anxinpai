import {
  HOUSEINFO_COURT_URl,
  HOUSEINFO_GET_BASE_LAYOUT,
  HOUSEINFO_GET_COURT_LAYOUT,
  HOUSEINFO_GET_AROUND_LAYOUT,
  HOUSE_PREVIEW_LIST,
  HOUSE_PREVIEW_SHOW,
  HOUSE_PREVIEW_HIDE,
  HOUSE_PREVIEW_INDEX
} from '../../action/houseInfo/actionTypes'

const defaultState = {
  courtUrl: '',
  baseLayout: 0,
  courtLayout: 0,
  aroundLayout: 0,
  previewList: [],
  previewVisible: false,
  previewIndex: 0
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
    case HOUSE_PREVIEW_LIST: {
      return {
        ...state,
        previewList: action.value
      }
    }
    case HOUSE_PREVIEW_SHOW: {
      return {
        ...state,
        previewVisible: action.value
      }
    }
    case HOUSE_PREVIEW_HIDE: {
      return {
        ...state,
        previewVisible: action.value
      }
    }
    case HOUSE_PREVIEW_INDEX: {
      return {
        ...state,
        previewIndex: action.value
      }
    }
    default: {
      return state
    }
  }
}
