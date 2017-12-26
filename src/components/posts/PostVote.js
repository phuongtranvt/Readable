import React from 'react';
import Vote from '../Vote';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {postUpVote, postDownVote} from '../../actions';

const PostVote = ({post, postUpVote, postDownVote}) => (
  <Vote
    id={post.id}
    voteScore={post.voteScore}
    onUpVote={postUpVote}
    onDownVote={postDownVote}
    size={30}
  />
)

const mapDispatchToProps = (dispatch) => ({
  postUpVote: (postId) => dispatch(postUpVote(postId)),
  postDownVote: (postId) => dispatch(postDownVote(postId)),
})

PostVote.propTypes = {
  post: PropTypes.object.isRequired,
  postUpVote: PropTypes.func.isRequired,
  postDownVote: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PostVote)
