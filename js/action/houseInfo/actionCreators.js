import {
  HOUSEINFO_COURT_URl,
  HOUSEINFO_GET_BASE_LAYOUT,
  HOUSEINFO_GET_COURT_LAYOUT,
  HOUSEINFO_GET_AROUND_LAYOUT,
  HOUSE_PREVIEW_LIST,
  HOUSE_PREVIEW_SHOW,
  HOUSE_PREVIEW_HIDE,
  HOUSE_PREVIEW_INDEX,
  HOUSE_PROPERTY
} from './actionTypes';

export const updateCourtUrl = (value) => ({
  type: HOUSEINFO_COURT_URl,
  value
});

export const getBaseLayout = (value) => ({
  type: HOUSEINFO_GET_BASE_LAYOUT,
  value
})

export const getCourtLayout = (value) => ({
  type: HOUSEINFO_GET_COURT_LAYOUT,
  value
})

export const getAroundLayout = (value) => ({
  type: HOUSEINFO_GET_AROUND_LAYOUT,
  value
})

export const updatePreviewList = (value) => ({
  type: HOUSE_PREVIEW_LIST,
  value
})

export const showPreview = (value) => ({
  type: HOUSE_PREVIEW_SHOW,
  value
})

export const hidePreview = (value) => ({
  type: HOUSE_PREVIEW_HIDE,
  value
})

export const updatePreviewIndex = (value) => ({
  type: HOUSE_PREVIEW_INDEX,
  value
})

export const updateHouseProperty = (value) => ({
  type: HOUSE_PROPERTY,
  value
})
