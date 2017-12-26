import * as ReadableAPI from '../utils/ReadableAPI';
import {
  RECEIVE_COMMENTS,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
  UPDATE_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  COMMENTS_LOADING_DATA,
} from './types';
import {setErrorAction, startLoadDataAction} from './payloadActions'

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
})

export const fetchComments = (postId) => dispatch => {
  dispatch(startLoadDataAction(COMMENTS_LOADING_DATA));

  ReadableAPI.getComments(postId)
    .then(res => {

      const comments = res.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {})

      dispatch(receiveComments(comments));
    })
    .catch((e) => dispatch(setErrorAction(`Error at fetchComments: ${e.message}`)))
}

export const commentUpVote = (commentId) => dispatch => (
  ReadableAPI.commentUpVote(commentId)
    .then(dispatch({
      type: COMMENT_UP_VOTE,
      id: commentId
    }))
    .catch((e) => dispatch(setErrorAction(`Error at commentUpVote: ${e.message}`)))
)

export const commentDownVote = (commentId) => dispatch => (
  ReadableAPI.commentDownVote(commentId)
    .then(dispatch({
      type: COMMENT_DOWN_VOTE,
      id: commentId
    }))
    .catch((e) => dispatch(setErrorAction(`Error at commentDownVote: ${e.message}`)))
)

export const updateCommentAction = (comment) => dispatch => (
  ReadableAPI.updateComment(comment)
    .then(res => dispatch({
      type: UPDATE_COMMENT,
      comment: res,
    }))
    .catch((e) => dispatch(setErrorAction(`Error at updateCommentAction: ${e.message}`)))
)

export const createCommentAction = comment => dispatch => (
  ReadableAPI.createComment(comment)
    .then(res => dispatch({
      type: CREATE_COMMENT,
      comment: res,
    }))
    .catch((e) => dispatch(setErrorAction(`Error at createCommentAction: ${e.message}`)))
)

export const deleteCommentAction = id => dispatch => (
  ReadableAPI.deleteComment(id)
    .then(dispatch({
      type: DELETE_COMMENT,
      id,
    }))
    .catch((e) => dispatch(setErrorAction(`Error at deleteCommentAction: ${e.message}`)))
)
