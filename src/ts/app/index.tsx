import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/index';

import AppComponent from './containers/app.component';

render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('root')
);
