import * as ReadableAPI from '../utils/ReadableAPI';
import {
  FETCH_CATEGORIES,
  FETCH_POSTS
} from './types';

export const fetchAllCategories = () => dispatch => (
  ReadableAPI.getAllCategories()
    .then(res => {

      const categories = res.reduce((acc, category) => {
        acc[category.name] = category;
        return acc;
      }, {});

      dispatch({
        type: FETCH_CATEGORIES,
        categories,
      })
    }
  )
)

export const fetchAllPosts = () => dispatch => (
  ReadableAPI.getAllPosts()
    .then(res => {

      const posts = res.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});
      dispatch({
        type: FETCH_POSTS,
        posts,
      })
    })
)

export const fetchPosts = (category) => dispatch => (
  ReadableAPI.getPosts(category)
    .then(res => {
      const posts = res.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});
      dispatch({
        type: FETCH_POSTS,
        posts,
      })
    })
)
