import {
  FILTER_ZONE_CHANGE,
  FILTER_SUBWAY_CHANGE,
  FILTER_SUBWAY_NAME_CHANGE,
  TOGGLE_SCROLL
} from '../../action/common/actionTypes';

const defaultState = {
  checkedZoneIndex: '',
  subwayLineIndex: '',
  subwayLineNameIndex: '',
  toggleScroll: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_ZONE_CHANGE: {
      return {
        ...state,
        checkedZoneIndex: action.value
      }
    }
    case FILTER_SUBWAY_CHANGE: {
      return {
        ...state,
        subwayLineIndex: action.value
      }
    }
    case FILTER_SUBWAY_NAME_CHANGE: {
      return {
        ...state,
        subwayLineNameIndex: action.value
      }
    }
    case TOGGLE_SCROLL: {
      return {
        ...state,
        toggleScroll: action.value
      }
    }
    default: {
      return state
    }
  }
}
