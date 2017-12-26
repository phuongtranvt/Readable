import React, {Component} from 'react';
import {connect} from 'react-redux';
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

class PostListContainer extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    console.log('in PostList render', this.props);
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

        <Typography noWrap type="headline">
          {capitalize(category)} {category === ALL_CATEGORY ? 'categories' : 'category'}
        </Typography>

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
  isFetching: payload.isPostsFetching,
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostListContainer));
