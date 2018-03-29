import React from 'react';
import '../style/App.css'
import {Route, Switch} from 'react-router-dom';
import ReadableMainDrawer from './ReadableMainDrawer';
import ErrorBoundary from './ErrorBoundary'
import PostListContainer from './posts/PostListContainer'
import PostDetail from './posts/PostDetail';
import PostNew from './posts/PostNew'
import PostEdit from './posts/PostEdit'

import ResponsiveDrawer from './ResponsiveDrawer'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <ReadableMainDrawer>
            <Switch>
              <Route exact path='/' component={PostListContainer} />
              <Route  exact path='/post/create'
                      component={PostNew} />

              <Route  exact path='/post/edit/:postId'
                      component={PostEdit} />

              <Route exact path='/:category' component={PostListContainer} />
              <Route exact path='/:category/:postId' component={PostDetail}/>
            </Switch>
          </ReadableMainDrawer>
        </ErrorBoundary>
      </div>
    );
  }
}
