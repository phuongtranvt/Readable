import * as ReadableAPI from '../utils/ReadableAPI';
import {
  FETCH_POSTS,
  FETCH_POST,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,
} from './types';
import {setErrorAction} from './payloadActions'

const receiveAllPost = (posts) => ({
  type: FETCH_POSTS,
  posts,
})

const receivePost = (post) => ({
  type: FETCH_POST,
  post
})

export const fetchAllPosts = () => dispatch => (
  ReadableAPI.getAllPosts()
    .then(res => {

      const posts = res.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});

      dispatch(receiveAllPost(posts));
    })
    .catch((e) => dispatch(setErrorAction(`Error at fetchAllPosts: ${e.message}`)))
)

export const fetchPost = (postId) => dispatch => (
  ReadableAPI.getPost(postId)
    .then(res => dispatch(receivePost(res)))
    .catch((e) => dispatch(setErrorAction(`Error at fetchPost: ${e.message}`)))
)

export const postUpVote = (postId) => dispatch => (
  ReadableAPI.postUpVote(postId)
    .then(dispatch({
      type: POST_UP_VOTE,
      id: postId
    }))
    .catch((e) => dispatch(setErrorAction(`Error at postUpVote: ${e.message}`)))
)

export const postDownVote = (postId) => dispatch => (
  ReadableAPI.postDownVote(postId)
    .then(dispatch({
      type: POST_DOWN_VOTE,
      id: postId
    }))
    .catch((e) => dispatch(setErrorAction(`Error at postDownVote: ${e.message}`)))
)

export const deletePost = (postId) => dispatch => (
  ReadableAPI.deletePost(postId)
    .then(dispatch({
      type: DELETE_POST,
      id: postId,
    }))
    .catch((e) => dispatch(setErrorAction(`Error at deletePost: ${e.message}`)))
)

export const updatePost = (post) => dispatch => (
  ReadableAPI.updatePost(post)
    .then(updatedPost => dispatch({
      type: UPDATE_POST,
      post: updatedPost
    }))
    .catch((e) => dispatch(setErrorAction(`Error at updatePost: ${e.message}`)))
)

export const createPost = (body) => dispatch => (
  ReadableAPI.createPost(body)
    .then(newPost => dispatch({
      type: CREATE_POST,
      post: newPost
    }))
    .catch((e) => dispatch(setErrorAction(`Error at createPost: ${e.message}`)))

)
