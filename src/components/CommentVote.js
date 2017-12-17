import React from 'react';
import Vote from './Vote';
import {connect} from 'react-redux'
import {commentUpVote, commentDownVote} from '../actions';

const CommentVote = ({comment, commentUpVote, commentDownVote}) => (
  <Vote
    id={comment.id}
    voteScore={comment.voteScore}
    onUpVote={commentUpVote}
    onDownVote={commentDownVote}
    size={25}
  />
)

const mapDispatchToProps = (dispatch) => ({
  commentUpVote: (id) => dispatch(commentUpVote(id)),
  commentDownVote: (id) => dispatch(commentDownVote(id)),
})

export default connect(null, mapDispatchToProps)(CommentVote)
