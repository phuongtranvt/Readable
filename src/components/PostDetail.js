import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions'
import {capitalize, formatDate} from '../utils/helpers';
import CommentList from './CommentList'
import CommentNew from './CommentNew'
import PostEditDeleteButtons from './PostEditDeleteButtons'
import PostVote from './PostVote'


class PostDetail extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId)
  }

  render() {
    const {post} = this.props;
    console.log('PostDetail render', this.props)
    return (
      <div>
        {post && Object.keys(post).length && (
          <div className="post-detail-content">
            <div className="post-comments-content">
              <div className="post-body-content">
                <PostVote post={post} />
                <article>
                  <div className="post-title-header">
                    <h3>{post.title}</h3>
                    <PostEditDeleteButtons id={post.id} />
                  </div>
                  <span className="detail-author">by <strong>{post.author}</strong>, post in {capitalize(post.category)}. {formatDate(post.timestamp)}</span>
                  <p>{post.body}</p>
                </article>
              </div>

              <CommentList />

              <CommentNew parentId={post.id}/>

            </div>
          </div>
        )}
      </div>
    )
  }
}

const getPostDetail = (posts, ownProps) => (
  posts[ownProps.match.params.postId]
)

const mapStateToProps = ({posts}, ownProps) => ({
  post: getPostDetail(posts, ownProps)
})

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postId) => dispatch(fetchPost(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
