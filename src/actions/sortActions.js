import {
  SET_SORT_BY,
  TOGGLE_SORT_ORDER,
} from './types';

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy
})

export const toogleSortOrder = () => ({
  type: TOGGLE_SORT_ORDER
})
