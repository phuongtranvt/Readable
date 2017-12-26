import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Loading from 'react-loading'
import {ALL_CATEGORY} from '../../utils/constants.js'
import {fetchAllCategories} from '../../actions';
import CategoryDrawer from './CategoryDrawer'

class CategoryDrawerContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    const {classes, categories, isFetching} = this.props;
    console.log('CategoryDrawerContainer', this.props)
    return (
      <div>
        {isFetching
          ? <Loading delay={200} type="spin" color="#222" className="loading" />
          : categories.length > 1 && (
            <CategoryDrawer classes={classes}
                            categories={categories}
            />
          )
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
  isFetching: payload.isCategoryFetching,
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllCategories: () => dispatch(fetchAllCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDrawerContainer)
