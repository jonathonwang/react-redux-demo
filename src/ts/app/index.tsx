// SCSS Imports
import '../../scss/app.scss';

// NPM Imports
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';

// Store Import
import { store } from './reducers/index';

// Component Import
import AppComponent from './containers/app.container';
import HomeComponent from './containers/home.container';
import TestComponent from './containers/test.container';

// History
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={AppComponent}>
        <Route path='/' component={HomeComponent}/>
        <Route path='/test' component={TestComponent}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
