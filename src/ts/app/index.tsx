// SCSS Imports
import '../../scss/app.scss';

// NPM Imports
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Store Import
import { store } from './reducers/index';

// Component Import
import AppComponent from './containers/app.component';

render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('root')
);
