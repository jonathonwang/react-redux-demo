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

// Router Map Import
import RouterMap from './routes/index.routes';

// Component Import
import AppComponent from './containers/app.container';

// History
const history = syncHistoryWithStore(browserHistory, store);

const routes = RouterMap.map((route) => (
  <Route path={route.path} component={route.component} key={route.path}/>
));

render(
  <Provider store={store}>
    <Router history={history}>
      {/* Main Layout Component */}
      <Route component={AppComponent}>
        {/* Routes */}
        {routes}
        {/* Routes */}
      </Route>
      {/* Main Layout Component */}
    </Router>
  </Provider>,
  document.getElementById('root')
);
