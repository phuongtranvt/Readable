import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {createSelector} from 'reselect';
import sortByValue from 'sort-by';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import Loading from 'react-loading'
import Typography from 'material-ui/Typography';
import AddIcon from 'react-icons/lib/md/add-circle';
import {fetchAllPosts} from '../../actions';
import {ALL_CATEGORY} from '../../utils/constants.js'
import {capitalize} from '../../utils/helpers';
import PostList from './PostList'
import Sort from '../Sort';

let count = 0;

class PostListContainer extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    console.log(`in PostList render ${count++}`);
    const {isFetching, posts} = this.props;
    const {match} = this.props;
    const category = match.params && match.params.category
                      ? match.params.category
                      : ALL_CATEGORY;

    return (
      <div>
        <div className="new-post">
          <Link to='/post/create'>
            <AddIcon size={50}/>
          </Link>
        </div>

        <h3 style={{marginLeft: '5px'}}>
          {capitalize(category)} {category === ALL_CATEGORY ? 'categories' : 'category'}
        </h3>

        <div className="sort-post">
          <Sort/>
        </div>

        {isFetching
          ? <Loading delay={200} type="spin" color="#222" className="loading" />
          : <PostList posts={posts} />
        }
      </div>
    );
  }
}

const makeGetVisiblePosts = () => (
    createSelector (
      (state, ownProps) => ownProps.match.params.category,
      state => state.posts,
      state => state.sort.sortBy,
      state => state.sort.isSortDescending,

      (selectedCategory, posts, sortBy, isSortDescending) => {
        let result = Object.values(posts).filter((post) => !post.deleted);

        result = selectedCategory
                ? result.filter((post) => post.category === selectedCategory)
                : result;

        const sortByStr = isSortDescending ? `-${sortBy}` : sortBy;
        result.sort(sortByValue(sortByStr));

        return result;
    }
  )
)

const makeMapStateToProps = () => {
  const getVisiblePosts = makeGetVisiblePosts()
  const mapStateToProps = (state, ownProps) => {
    return {
      posts: getVisiblePosts(state, ownProps),
      isFetching: state.payload.isPostsFetching,
    }
  }

  return mapStateToProps;
}

const mapDispatchToProps = {fetchAllPosts}

export default compose(
  withRouter,
  connect(makeMapStateToProps, mapDispatchToProps),
)(PostListContainer)
