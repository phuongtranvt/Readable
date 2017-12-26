import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_POST,
  POST_UP_VOTE,
  POST_DOWN_VOTE,
} from '../actions/types';

const post = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
    case UPDATE_POST:
    case CREATE_POST:
      return action.post;
    case POST_UP_VOTE:
      return {
        ...state,
        voteScore: state.voteScore + 1
      }
    case POST_DOWN_VOTE:
      return {
        ...state,
        voteScore: state.voteScore - 1
      }
    case DELETE_POST:
      return {
        ...state,
        deleted: true,
      }
    default:
      return state;
  }
}

export const posts = (state = {}, action) =>  {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
    case UPDATE_POST:
    case CREATE_POST:
      return {
        ...state,
        [action.post.id]: post(undefined, action)
      }
    case DELETE_POST:
      return {
        ...state,
        [action.id]: post(state[action.id], action)
      }
    case POST_UP_VOTE:
    case POST_DOWN_VOTE:
      return {
        ...state,
        [action.id]: post(state[action.id], action)
      }

    default:
      return state;
  }
}
