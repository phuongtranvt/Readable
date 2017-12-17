import {
  FETCH_COMMENTS,
  COMMENT_UP_VOTE,
  COMMENT_DOWN_VOTE,
  UPDATE_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

const comment = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
    case UPDATE_COMMENT:
      return action.comment;
    case COMMENT_UP_VOTE:
      return {
        ...state,
        voteScore: state.voteScore + 1
      }
    case COMMENT_DOWN_VOTE:
      return {
        ...state,
        voteScore: state.voteScore - 1
      }
    case DELETE_COMMENT:
      return {
        ...state,
        deleted: true,
      }
    default:
      return state;
  }
}

export const comments = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.comments;
    case UPDATE_COMMENT:
    case CREATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: comment(undefined, action)
      }
    case COMMENT_UP_VOTE:
    case COMMENT_DOWN_VOTE:
    case DELETE_COMMENT:
      return {
        ...state,
        [action.id]: comment(state[action.id], action)
      }

    default:
      return state;
  }
}
