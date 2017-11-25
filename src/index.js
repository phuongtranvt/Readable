import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import './style/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhance(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
