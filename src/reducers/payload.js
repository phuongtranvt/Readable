import {combineReducers} from 'redux'
import {
  RECEIVE_CATEGORIES,

  RECEIVE_POSTS,
  RECEIVE_POST,

  RECEIVE_COMMENTS,

  CATEGORIES_LOADING_DATA,
  POSTS_LOADING_DATA,
  POST_DETAIL_LOADING_DATA,
  COMMENTS_LOADING_DATA,
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

const isCategoryFetching = (state = false, action) => {
  switch (action.type) {
    case CATEGORIES_LOADING_DATA:
      return true;
    case RECEIVE_CATEGORIES:
      return false;

    default:
      return state;
  }
}

const isPostsFetching = (state = false, action) => {
  switch (action.type) {
    case POSTS_LOADING_DATA:
      return true;
    case RECEIVE_POSTS:
      return false;

    default:
      return state;
  }
}

const isPostDetailFetching = (state = false, action) => {
  switch (action.type) {
    case POST_DETAIL_LOADING_DATA:
      return true;
    case RECEIVE_POST:
      return false;
    default:
      return state;
  }
}

const isCommentsFetching = (state = false, action) => {
  switch (action.type) {
    case COMMENTS_LOADING_DATA:
      return true;
    case RECEIVE_COMMENTS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  error,
  isCategoryFetching,
  isPostsFetching,
  isPostDetailFetching,
  isCommentsFetching
})
