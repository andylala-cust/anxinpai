import {
  FILTER_ZONE_CHANGE,
  FILTER_SUBWAY_CHANGE,
  FILTER_SUBWAY_NAME_CHANGE,
  TOGGLE_SCROLL,
  FILTER_MORE_CHANGE,
  CITY_CHANGE,
  SLIDE_MODAL,
  GET_HOT_CITY_LAYOUT,
  TOGGLE_HOME_REFRESH
} from './actionTypes';

export const filterZoneChange = (value) => ({
  type: FILTER_ZONE_CHANGE,
  value
});

export const filterSubwayChange = (value) => ({
  type: FILTER_SUBWAY_CHANGE,
  value
});

export const filterSubwayNameChange = (value) => ({
  type: FILTER_SUBWAY_NAME_CHANGE,
  value
})

export const toggleScroll = (value) => ({
  type: TOGGLE_SCROLL,
  value
})

export const filterMoreChange = (value) => ({
  type: FILTER_MORE_CHANGE,
  value
})

export const changeCity = (value) => ({
  type: CITY_CHANGE,
  value
})

export const slideModal = (value) => ({
  type: SLIDE_MODAL,
  value
})

export const getHotCityLayout = (value) => ({
  type: GET_HOT_CITY_LAYOUT,
  value
})

export const toggleHomeRefresh = (value) => ({
  type: TOGGLE_HOME_REFRESH,
  value
})
