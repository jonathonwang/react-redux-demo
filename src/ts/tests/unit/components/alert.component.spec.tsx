import * as React from 'react';
import { shallow } from 'enzyme';

import { AlertComponent } from '../../../app/components/alert.component';

describe('Alert Component', () => {
  let wrapper;
  const dispatch = jasmine.createSpy('dispatch');
  beforeEach(() => {
    dispatch.calls.reset();
    const alert = { status: '', message: '', visible: false };
    wrapper = shallow(
      <AlertComponent alert={alert} dispatch={dispatch}/>
    );
  });
  it('Should Render Correctly', () => {
    const wrapperElement = wrapper.type();
    expect(wrapperElement).toEqual('div');
    const wrapperClasses = wrapper.props().className.split(' ');
    const expectedWrapperClasses = ['alert', 'alert-dismissable', 'alert-'];
    expect(wrapperClasses).toEqual(expectedWrapperClasses);
    const closeBtn = wrapper.find('.close');
    expect(closeBtn).toBeDefined();
  });
  it('Should Render Danger Alert Visible', () => {
    wrapper.setProps({ alert: { status: 'danger', message: 'Danger Message', visible: true } });
    const wrapperClasses = wrapper.props().className.split(' ');
    const expectedWrapperClasses = ['alert', 'alert-dismissable', 'alert-danger', 'alert--visible'];
    expect(wrapperClasses).toEqual(expectedWrapperClasses);
    const alertStatus = wrapper.find('#alert-status').text();
    const expectedAlertStatus = 'danger!';
    expect(alertStatus).toEqual(expectedAlertStatus);
    const alertMessage = wrapper.find('#alert-message').text();
    const expectedAlertMessage = 'Danger Message.';
    expect(alertMessage).toEqual(expectedAlertMessage);
  });
  it('Should Run closeAlert Method', () => {
    const closeBtn = wrapper.find('.close');
    closeBtn.simulate('click', { preventDefault() {} });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.calls.count()).toEqual(1);
  });
});
