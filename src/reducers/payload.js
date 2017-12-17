import {combineReducers} from 'redux'
import {
  FETCH_CATEGORIES,

  FETCH_POSTS,
  FETCH_POST,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,

  FETCH_COMMENTS,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
  UPDATE_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,

  LOADING_DATA,
  SET_ERROR,
} from '../actions/types';

const error = (state = '', action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.error || 'Something went wrong';
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return true;
    case FETCH_CATEGORIES:
    case FETCH_POSTS:
    case FETCH_POST:
    case POST_UP_VOTE:
    case POST_DOWN_VOTE:
    case DELETE_POST:
    case UPDATE_POST:
    case CREATE_POST:
    case FETCH_COMMENTS:
    case COMMENT_UP_VOTE:
    case COMMENT_DOWN_VOTE:
    case UPDATE_COMMENT:
    case CREATE_COMMENT:
    case DELETE_COMMENT:
      return false;

    default:
      return state;

  }
}

export default combineReducers({
  error,
  isFetching,
})
