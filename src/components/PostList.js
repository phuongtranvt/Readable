import React, {Component} from 'react';
import {connect} from 'react-redux';
import sortByValue from 'sort-by';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import Loading from 'react-loading'
import {fetchAllPosts, startLoadDataAction} from '../actions';
import {capitalize, formatDate} from '../utils/helpers';
import PostVote from './PostVote';
import PostEditDeleteButtons from './PostEditDeleteButtons';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }

  displayPost = (posts) => (
    <div>
      {(posts && posts.length)
        ? posts.map((post) => (
            <div key={post.id}>
              <div className="post-body-content">
                <PostVote post={post} />
                <article>
                  <div className="post-title-header">
                    <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    <PostEditDeleteButtons id={post.id} />
                  </div>
                  <span className="detail-author">by <strong>{post.author}</strong>, post in {capitalize(post.category)}. {formatDate(post.timestamp)}</span>
                  <p>{post.commentCount} {post.commentCount > 1 ? 'Comments' : 'Comment'}</p>
                </article>
              </div>
            </div>
          ))
        : <p style={{margin: '20px'}}>There is no post in this category</p>
      }
    </div>
  )

  render() {
    console.log('in PostList render', this.props);
    const {isFetching, posts} = this.props;

    return (
      <div>
        {isFetching
          ? <Loading delay={200} type="spin" color="#222" className="loading" />
          : this.displayPost(posts)
        }
      </div>
    );
  }
}

const getVisiblePosts = (
  posts,
  sortBy,
  isSortDescending,
  ownProps
) => {
  const selectedCategory = ownProps.match.params.category;
  let result = Object.values(posts).filter((post) => !post.deleted);

  result = selectedCategory
          ? result.filter((post) => post.category === selectedCategory)
          : result;

  const sortByStr = isSortDescending ? `-${sortBy}` : sortBy;
  result.sort(sortByValue(sortByStr));

  return result;
};

const mapStateToProps = ({posts, sort, payload}, ownProps) => ({
  posts: getVisiblePosts(posts, sort.sortBy, sort.isSortDescending, ownProps),
  isFetching: payload.isFetching,
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
  startLoadData: () => dispatch(startLoadDataAction()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
