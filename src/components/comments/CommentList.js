import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  fetchComments,
  deleteCommentAction,
} from '../../actions';
import {withRouter} from 'react-router'
import sortByValue from 'sort-by';
import Loading from 'react-loading'
import {formatDate} from '../../utils/helpers';
import CommentVote from './CommentVote'
import Sort from '../Sort'
import CommentEdit from './CommentEdit';
import CommentEditDeleteButtons from './CommentEditDeleteButtons';

class CommentList extends Component {
  state = {
    commentEditOpen: false,
    commentEditId: null,
  }

  openCommentEdit = (id) => {
    this.setState({
      commentEditOpen: true,
      commentEditId: id,
    })
  }

  closeCommentEdit = () => {
    this.setState({
      commentEditOpen: false,
      commentEditId: null,
    })
  }

  componentDidMount() {
    this.props.fetchComments(this.props.match.params.postId);
  }

  displayComments = (comments) => (
    <div>
      <div className="comments-count-header">
        <p><strong>{comments.length} {comments.length > 1 ? 'Comments' : 'Comment'}</strong></p>
        <Sort />
      </div>

      {comments && comments.map(comment => (
      <div key={comment.id} className="comment-content">
        <div className="comment-body">
          <CommentVote comment={comment}/>

          <div className="comment-body-inner">
            <div className="comment__meta">
              <div className="comment__meta-info">
                <div className="comment-title-header">
                  <span className="comment__user-name">{comment.author}</span>

                  <CommentEditDeleteButtons id={comment.id}
                                            onEdit={this.openCommentEdit}
                                            onDelete={this.props.deleteComment} />

                </div>
                <span className="comment__date">{formatDate(comment.timestamp)}</span>
              </div>
            </div>

            {this.state.commentEditOpen &&
              this.state.commentEditId === comment.id
              ? (
                  <CommentEdit  editingComment={comment}
                                onSubmitCB={this.closeCommentEdit}
                                onCancel={this.closeCommentEdit}
                  />
                )
              : (
                  <p className="comment__body">{comment.body}</p>
                )
            }
          </div>
        </div>
      </div>
      ))}
    </div>
  )

  render() {
    const {comments, isFetching} = this.props;
    return (
      <div className="comments-content">
        {isFetching
          ? <Loading delay={200} type="spin" color="#222" className="loading" />
          : this.displayComments(comments)
        }

      </div>
    )
  }
}

const getVisibleComments = (
  comments,
  sortBy,
  isSortDescending,
  ownProps
) => {
  let result = Object.values(comments).filter((comment) => !comment.deleted);

  const sortByStr = isSortDescending ? `-${sortBy}` : sortBy;
  result.sort(sortByValue(sortByStr));

  return result;
};

const mapStateToProps = ({comments, sort, payload}, ownProps) => ({
  comments: getVisibleComments(comments, sort.sortBy, sort.isSortDescending, ownProps),
  isFetching: payload.isCommentsFetching,
})

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (postId) => dispatch(fetchComments(postId)),
  deleteComment: id => dispatch(deleteCommentAction(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList));
