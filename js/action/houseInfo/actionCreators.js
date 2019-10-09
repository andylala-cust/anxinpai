import {
  HOUSEINFO_COURT_URl,
  HOUSEINFO_GET_BASE_LAYOUT,
  HOUSEINFO_GET_COURT_LAYOUT,
  HOUSEINFO_GET_AROUND_LAYOUT
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
