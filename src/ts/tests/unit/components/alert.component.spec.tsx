import * as React from 'react';
import { shallow } from 'enzyme';

import { AlertComponent } from '../../../app/components/alert.component';

describe('Alert Component', () => {
  let wrapper;
  const hideAlert = jasmine.createSpy('hideAlert');
  beforeEach(() => {
    hideAlert.calls.reset();
    const alert = { status: '', message: '', visible: false };
    wrapper = shallow(
      <AlertComponent alert={alert} hideAlert={hideAlert}/>
    );
  });
  it('Should Render Correctly', () => {
    const wrapperElement = wrapper.type();
    expect(wrapperElement).toEqual('div');
  });
  it('Should Have Correct Classes', () => {
    const wrapperClasses = wrapper.props().className.split(' ');
    const expectedWrapperClasses = ['alert', 'alert-dismissable', 'alert-'];
    expect(wrapperClasses).toEqual(expectedWrapperClasses);
  });
  it('Should Contain Close Button', () => {
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
  it('Click on Close Button Should Run hideAlert Method', () => {
    const closeBtn = wrapper.find('.close');
    closeBtn.simulate('click', { preventDefault() {} });
    expect(hideAlert).toHaveBeenCalled();
    expect(hideAlert.calls.count()).toEqual(1);
  });
});
