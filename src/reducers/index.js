import { combineReducers } from 'redux';
import {
  FETCH_CATEGORIES,
  FETCH_POSTS
} from '../actions/types';

const initialCategoriesState = {
    'react': {
      name: 'react',
      path: 'react',
    },
    'redux': {
      name: 'redux',
      path: 'redux',
    },
    'udacity': {
      name: 'udacity',
      path: 'udacity',
    },
}

const categories = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

const posts = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.posts;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts
});
