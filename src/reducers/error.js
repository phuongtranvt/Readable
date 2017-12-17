import {
  SET_ERROR,
} from '../actions/types';

export const error = (state = '', action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error || 'Something went wrong';
    default:
      return state;
  }
}
