import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import classnames from 'classnames';
import sortBy from 'sort-by';
import ArrowUpIcon from 'react-icons/lib/ti/arrow-sorted-up';
import ArrowDownIcon from 'react-icons/lib/ti/arrow-sorted-down';
import AddIcon from 'react-icons/lib/md/add-circle';
import EditIcon from 'react-icons/lib/md/edit';
import DeleteIcon from 'react-icons/lib/md/delete';
import {capitalize, formatDate} from '../utils/helpers';



class ListCategories extends Component {
  SORT_DESC = 'Descending';
  SORT_ASC = 'Ascending';

  sortList = [
    {
      id : 'voteScore',
      name: 'Vote Score',
    },
    {
      id: 'timestamp',
      name: 'Date'
    }];

  state = {
    activeTab: 'all',
    sortBy: this.sortList[0].id,
    sortDesc: true,
  }

  toggle(tab) {
    console.log(tab);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });

      const {fetchAllPosts, fetchPosts} = this.props;
      tab === 'all'? fetchAllPosts() : fetchPosts(tab);
    }
  }

  toggleSortOrder = () => {
    this.setState((prevState) => ({sortDesc: !prevState.sortDesc}))
  }

  componentDidMount() {
    console.log('componentDidMount:');
    const {fetchAllCategories, fetchAllPosts} = this.props;
    fetchAllCategories();
    fetchAllPosts();
  }

  sortComponent() {
    const sortListUI = [{id: 'none', name: 'Sort by...'}, ...this.sortList];
    return (
      <div className="sort">
        <button onClick={this.toggleSortOrder}>
          {this.state.sortDesc ? this.SORT_DESC: this.SORT_ASC}
        </button>
        <select>
          {sortListUI.map(({id, name}) => (
            <option
              key={id}
              value={id}
              disabled={id === 'none'? true : false}
            >
              {name}
            </option>
          ))}
        </select>
      </div>
    );

  }

  render() {
    console.log('props in render()', this.props);
    console.log('state in render()', this.state);
    const {categories, posts} = this.props;

    const sortByStr = this.state.sortDesc ? `-${this.state.sortBy}` : this.state.sortBy;
    posts.sort(sortBy(sortByStr));

    return (
      <div className="list-categories-content-TODO">
          {this.sortComponent()}
          <div className="new-post">
            <a>
              <AddIcon size={40}/>
            </a>
          </div>
        <div className="category-content">

          <Nav tabs>
            {categories && categories.map(({name}) => (
              <NavItem key={name}>
                <NavLink
                  className={classnames({ active: this.state.activeTab === name })}
                  onClick={() => { this.toggle(name); }}
                >
                  {capitalize(name)}
                </NavLink>
              </NavItem>

            ))}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={this.state.activeTab}>
                {(posts && posts.length > 0)
                  ? posts.map((post) => (
                      <div key={post.id}>
                        <Row className="post-content">
                          <div>
                            <EditIcon size={30} />
                            <DeleteIcon size={30} />
                          </div>
                          <div className="post-vote-content">
                              <button className="icon-btn-vote">
                                <ArrowUpIcon size={30} />
                              </button>
                              <p className="post-voteScore">{post.voteScore}</p>
                              <button className="icon-btn-vote">
                                <ArrowDownIcon size={30} />
                              </button>
                          </div>
                          <div className="post-title-content">
                            <p>{post.title}</p>
                            <p>by {post.author}, post in {capitalize(post.category)}. {formatDate(post.timestamp)}</p>
                          </div>
                        </Row>
                        <hr />
                      </div>
                ))
                : <p>There is no post in this category</p>
              }


              </TabPane>



          </TabContent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({categories, posts}) => ({
  categories: [
    {name: 'all', path: 'NA'},
    ...Object.values(categories)
  ],
  posts: Object.values(posts),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllCategories: () => dispatch(actions.fetchAllCategories()),
  fetchAllPosts: () => dispatch(actions.fetchAllPosts()),
  fetchPosts: (category) => dispatch(actions.fetchPosts(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);

/*
<TabPane tabId="22">
  <div className="post-detail-content">
      <div className="post-vote-content">
          <button className="icon-btn-vote">
            <ArrowUpIcon size={30} />
          </button>
          <p className="post-voteScore">150</p>
          <button className="icon-btn-vote">
            <ArrowDownIcon size={30} />
          </button>
      </div>
      <div className="post-title-content">
        <p>This is post title</p>
        <p>Submitted by Author. Datetime</p>
        <div className="post-body-content">
          <p> This is the post content </p>
        </div>
        <div className="comments-content">
          <p>This is comment 1</p>
          <p>This is comment 2</p>
        </div>
        <div className="add-comment">
          <input
            type="text" placeholder="Write a comment..."
          />
          <button>Submit</button>
        </div>
      </div>
  </div>

  <div className="new-post">
    <a>
      <AddIcon size={50}/>
    </a>
  </div>
</TabPane>
*/
