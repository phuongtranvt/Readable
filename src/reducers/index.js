import { combineReducers } from 'redux';
import * as categoriesReducer from './categories'
import * as postsReducer from './posts';
import * as commentReducer from './comments'
import sort from './sort';
import payload from './payload'

export default combineReducers({
  categories: categoriesReducer.categories,
  posts: postsReducer.posts,
  comments: commentReducer.comments,
  sort,
  payload,
});
