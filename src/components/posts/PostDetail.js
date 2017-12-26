import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading'
import {fetchPost} from '../../actions'
import {capitalize, formatDate} from '../../utils/helpers';
import CommentList from '../comments/CommentList'
import CommentNew from '../comments/CommentNew'
import PostEditDeleteButtons from './PostEditDeleteButtons'
import PostVote from './PostVote'

class PostDetail extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postId)
  }

  render() {
    const {post, isFetching} = this.props;

    return (
      <div>
        {isFetching
          ? <Loading delay={200} type="spin" color="#222" className="loading" />
          : post && Object.keys(post).length && (
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
          )
        }
      </div>
    )
  }
}

const getPostDetail = (posts, ownProps) => (
  posts[ownProps.match.params.postId]
)

const mapStateToProps = ({posts, payload}, ownProps) => ({
  post: getPostDetail(posts, ownProps),
  isFetching: payload.isPostDetailFetching
})

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postId) => dispatch(fetchPost(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
