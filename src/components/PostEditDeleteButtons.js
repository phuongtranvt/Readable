import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {deletePost} from '../actions'
import {Link} from 'react-router-dom'
import DeleteIcon from 'react-icons/lib/md/delete';

const PostEditDeleteButtons = ({id, deletePost, history, match}) => (
  <div className="edit-delete-content">
    <Link to={`/post/edit/${id}`} className="create-post-link">
      Create/Update Post
    </Link>
    <button className="icon-btn"
            onClick={() => {
              deletePost(id);
              match.params.category ? history.push(`/${match.params.category}`) : history.push('/');
            }}>
      <DeleteIcon size={25} />
    </button>
  </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({
  deletePost: (id) => dispatch(deletePost(id)),
})

export default withRouter(connect(null, mapDispatchToProps)(PostEditDeleteButtons));
