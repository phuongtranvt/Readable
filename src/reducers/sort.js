import { combineReducers } from 'redux';
import {
  VOTE_SCORE,
} from '../utils/constants';
import {
  SET_SORT_BY,
  TOGGLE_SORT_ORDER,
} from '../actions/types';

const sortBy = (state = VOTE_SCORE, action) => {
  switch (action.type) {
    case SET_SORT_BY:
      return action.sortBy;
    default:
      return state;
  }
}

const isSortDescending = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_SORT_ORDER:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  sortBy,
  isSortDescending
});
