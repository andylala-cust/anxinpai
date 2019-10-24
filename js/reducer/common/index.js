import {
  FILTER_ZONE_CHANGE,
  FILTER_SUBWAY_CHANGE,
  FILTER_SUBWAY_NAME_CHANGE,
  TOGGLE_SCROLL,
  FILTER_MORE_CHANGE
} from '../../action/common/actionTypes';

const defaultState = {
  checkedZoneIndex: '',
  subwayLineIndex: '',
  subwayLineNameIndex: '',
  toggleScroll: true,
  moreParam: {
    areaIndex: '',
    resetIndex: '',
    rentIndex: '',
    taxIndex: '',
    circIndex: '',
  }
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
    case FILTER_MORE_CHANGE: {
      return {
        ...state,
        moreParam: action.value
      }
    }
    default: {
      return state
    }
  }
}
