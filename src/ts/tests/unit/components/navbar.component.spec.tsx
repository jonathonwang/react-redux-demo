import * as React from 'react';
import { shallow } from 'enzyme';

import { NavbarComponent } from '../../../app/components/navbar.component';

describe('Navbar Component', () => {
  let wrapper;
  const toggleNavbar = jasmine.createSpy('toggleNavbar');

  beforeEach(() => {
    const navbar = {
      open: false
    };
    wrapper = shallow(
      <NavbarComponent navbar={navbar} toggleNavbar={toggleNavbar}/>
    );
    toggleNavbar.calls.reset();
  });

  it('Should Render Correctly', () => {
    const wrapperElement = wrapper.type();
    expect(wrapperElement).toEqual('nav');
    const navbar = wrapper.find('#navbar');
    expect(navbar).toBeDefined();
  });
  it('Should Have Correct Classes', () => {
    const wrapperClasses = wrapper.props().className.split(' ');
    const expectedWrapperClasses = ['navbar', 'navbar-default', 'navbar-fixed-top'];
    expect(wrapperClasses).toEqual(expectedWrapperClasses);
  });
  it('Click on Toggle Btn Should Run toggleNavbar Method', () => {
    const toggleBtn = wrapper.find('button');
    toggleBtn.simulate('click');
    expect(toggleNavbar.calls.count()).toEqual(1);
  });
});
