import * as React from 'react';
import { shallow } from 'enzyme';

import { NavLink } from '../../../app/components/navlink.component';

describe('Nav Link Component', () => {
  let wrapper;

  beforeEach(() => {
    const router = { isActive: (a, b) => true };
    wrapper = shallow(
      <NavLink to='/' router={router}>
        Test
      </NavLink>
    );
  });

  it('Should Render Correctly', () => {
    const wrapperType = wrapper.type();
    expect(wrapperType).toEqual('li');
    const link = wrapper.find('a');
    expect(link).toBeDefined();
  });
  it('Should Have Correct To Prop', () => {
    const link = wrapper.find('Link');
    const linkPath = link.props().to;
    expect(linkPath).toEqual('/');
  });
  it('Should Have Active Class', () => {
    const wrapperClasses = wrapper.props().className.split(' ');
    const expectedWrapperClasses = ['active'];
    expect(wrapperClasses).toEqual(expectedWrapperClasses);
  });
  it('Should Have Correct Child Text', () => {
    const link = wrapper.find('Link');
    const linkText = link.children().text();
    expect(linkText).toEqual('Test');
  });
});
