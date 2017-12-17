import React from 'react';
import '../style/App.css'
import {Route, Switch, Link} from 'react-router-dom';
import FilteredPostsTab from './FilteredPostsTab';
import PostDetail from './PostDetail';
import PostNew from './PostNew'
import PostEdit from './PostEdit'
import ErrorBoundary from './ErrorBoundary'

export default class Example extends React.Component {
  state = {
    activeTab: '1',
    showCategory: true,
    showPostDetails: false,
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <div className="header-title">
          <h1>
            <Link to="/">Readable</Link>
          </h1>
        </div>

        <div>
          <ErrorBoundary>
            <Switch>
              <Route exact path='/' component={FilteredPostsTab} />
              <Route
                exact path='/post/create'
                component={PostNew}
              />
              <Route
                exact path='/post/edit/:postId'
                component={PostEdit}
              />
              <Route exact path='/:category' component={FilteredPostsTab} />
              <Route exact path='/:category/:postId' component={PostDetail}/>
            </Switch>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

/*
<Route
  exact path='/post/create'
  component={PostNewEditForm}
/>
<Route
  exact path='/post/edit/:postId'
  render={({history, match}) => (
    <PostNewEditForm
      history={history} match={match}
      isEdit={true}/>
  )}
/>
*/
