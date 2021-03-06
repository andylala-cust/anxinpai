import {
  FILTER_ZONE_CHANGE,
  FILTER_SUBWAY_CHANGE,
  FILTER_SUBWAY_NAME_CHANGE,
  TOGGLE_SCROLL,
  FILTER_MORE_CHANGE,
  CITY_CHANGE,
  SLIDE_MODAL,
  GET_HOT_CITY_LAYOUT,
  TOGGLE_HOME_REFRESH,
  NOTIFY_STATUS,
  LOVE_STATUS,
  USER_LOVE_CHANGE,
  USER_NOTIFY_CHANGE,
  SEARCH_CHANGE,
  SEARCH_VALUE
} from '../../action/common/actionTypes';
import {DEFAULT_USER_AVATAR} from  '../../constants';

const defaultState = {
  checkedZoneIndex: '',
  subwayLineIndex: '',
  subwayLineNameIndex: '',
  toggleScroll: true,
  toggleRefreshHome: false,
  toggleSearchRefresh: false,
  moreParam: {
    areaIndex: '',
    resetIndex: '',
    rentIndex: '',
    taxIndex: '',
    circIndex: '',
  },
  slideModal: '',
  hotCityLayout: 0,
  showLoader: false,
  notifyStatus: 0,
  loveStatus: 0,
  userLoveChange: false,
  userNotifyChange: false,
  searchVal: ''
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
    case CITY_CHANGE: {
      return {
        ...state,
        toggleRefreshHome: action.value
      }
    }
    case SLIDE_MODAL: {
      return  {
        ...state,
        slideModal: action.value
      }
    }
    case GET_HOT_CITY_LAYOUT: {
      return {
        ...state,
        hotCityLayout: action.value
      }
    }
    case TOGGLE_HOME_REFRESH: {
      return {
        ...state,
        showLoader: action.value
      }
    }
    case NOTIFY_STATUS: {
      return {
        ...state,
        notifyStatus: action.value
      }
    }
    case LOVE_STATUS: {
      return {
        ...state,
        loveStatus: action.value
      }
    }
    case USER_LOVE_CHANGE: {
      return {
        ...state,
        userLoveChange: action.value
      }
    }
    case USER_NOTIFY_CHANGE: {
      return {
        ...state,
        userNotifyChange: action.value
      }
    }
    case SEARCH_CHANGE: {
      return {
        ...state,
        toggleSearchRefresh: action.value
      }
    }
    case SEARCH_VALUE: {
      return {
        ...state,
        searchVal: action.value
      }
    }
    default: {
      return state
    }
  }
}
