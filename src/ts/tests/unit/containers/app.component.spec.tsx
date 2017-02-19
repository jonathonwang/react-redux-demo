import * as React from 'react';
import { shallow, mount, render } from 'enzyme';

import { Provider } from 'react-redux';

// Store Import
import { store } from '../../../app/reducers/index';

import AppComponent from '../../../app/containers/app.component';

describe('App Container Component', () => {
  let wrapper;
  let appComponent;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <AppComponent/>
      </Provider>
    );
    appComponent = wrapper.find('AppComponent');
  });

  it('Should Render Correctly', () => {
    // console.log(appComponent.props());
  });
});
