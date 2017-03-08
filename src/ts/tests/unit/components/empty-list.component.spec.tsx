import * as React from 'react';
import { shallow } from 'enzyme';

import { EmptyListComponent } from '../../../app/components/empty-list.component';

describe('Empty List Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <EmptyListComponent/>
    );
  });

  it('Should Render Correctly', () => {
    const wrapperType = wrapper.type();
    expect(wrapperType).toEqual('li');
  });
  it('Should Have Correct Classes', () => {
    const wrapperClasses = wrapper.props().className.split(' ');
    const expectedWrapperClasses = ['list-group-item', 'text-center'];
    expect(wrapperClasses).toEqual(expectedWrapperClasses);
  });
  it('Should Have Correct Text', () => {
    const text = wrapper.find('h5').text();
    expect(text).toEqual('Start By Creating Some Tasks!');
  });
});
