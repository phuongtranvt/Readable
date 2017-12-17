import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Tab, Menu } from 'semantic-ui-react'
import Loading from 'react-loading'
import {fetchAllCategories, startLoadDataAction} from '../actions';
import {capitalize} from '../utils/helpers';
import {ALL_CATEGORY} from '../utils/constants.js'
import PostList from './PostList';
import Sort from './Sort';
import AddIcon from 'react-icons/lib/md/add-circle';

class FilteredPostsTab extends Component {
  createPostListPanes = () => {
    const {categories} = this.props;
    if (categories && categories.length) {
      return (
        categories.map((name) => (
          { menuItem: <Menu.Item
                        key={name}
                        as={Link}
                        to={name === ALL_CATEGORY ? '' : name}
                      >
                        {capitalize(name)}
                      </Menu.Item> ,
          render: () => <Tab.Pane as={PostList}></Tab.Pane> }
        ))
      )
    }

    return [];
  }

  componentDidMount() {
    this.props.startLoadData();
    this.props.fetchAllCategories();
  }

  render() {
    console.log('in CategoryHeaderTab render', this.props);
    const panes = this.createPostListPanes();

    let {category} = this.props.match.params;
    if (!category) {
      category = ALL_CATEGORY;
    }

    return (
      <div>
        <div className="sort-post">
          <Sort/>
        </div>

        <div className="new-post">
          <Link to='/post/create'>
            <AddIcon size={30}/>
          </Link>
        </div>

        {this.props.isFetching
          ? <Loading delay={200} type="spin" color="#222" className="loading" />
          : <Tab  panes={panes}
                  activeIndex={this.props.categories.indexOf(category)} />
        }

      </div>
    )
  }
}

const mapStateToProps = ({categories, payload}) => ({
  categories: [
    ALL_CATEGORY,
    ...Object.keys(categories)
  ],
  isFetching: payload.isFetching,
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
  startLoadData: () => dispatch(startLoadDataAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilteredPostsTab);
