import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {capitalize, formatDate} from '../../utils/helpers';
import PostVote from './PostVote';
import PostEditDeleteButtons from './PostEditDeleteButtons';

const PostList = ({posts}) => (
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

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
