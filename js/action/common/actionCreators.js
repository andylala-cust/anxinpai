import {
  FILTER_ZONE_CHANGE,
  FILTER_SUBWAY_CHANGE,
  FILTER_SUBWAY_NAME_CHANGE,
  TOGGLE_SCROLL
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
