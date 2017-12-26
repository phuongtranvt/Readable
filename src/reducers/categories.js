import {
  RECEIVE_CATEGORIES,
} from '../actions/types';

export const categories = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
