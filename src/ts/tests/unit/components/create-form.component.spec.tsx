import * as React from 'react';
import { shallow } from 'enzyme';

import CreateFormComponent from '../../../app/components/create-form.component';

describe('Create Form Component', () => {
  let wrapper;
  const updateInputMethod = jasmine.createSpy('updateInputMethod');
  const submitFormMethod = jasmine.createSpy('submitFormMethod');

  beforeEach(() => {
    const createForm = {
      title: '',
      isComplete: false
    };
    wrapper = shallow(
      <CreateFormComponent
        createForm={createForm}
        handleInputUpdate={() => updateInputMethod()}
        handleSubmitForm={() => submitFormMethod()}
      />
    );
  });

  it('Should Render Correctly', () => {
    const wrapperType = wrapper.type();
    expect(wrapperType).toEqual('li');
    const wrapperClass = wrapper.props().className;
    expect(wrapperClass).toEqual('list-group-item');
    const textInput = wrapper.find('input');
    expect(textInput).toBeDefined();
    const textInputName = textInput.props().name;
    expect(textInputName).toEqual('title');
    const taskForm = wrapper.find('form');
    expect(taskForm).toBeDefined();
  });
  it('Should Have Text in Input given createForm Prop with title', () => {
    const createFormWithTitle = { title: 'Hello', isComplete: false };
    wrapper.setProps({ createForm: createFormWithTitle });
    const textInput = wrapper.find('input');
    const textInputValue = textInput.props().value;
    expect(textInputValue).toEqual(createFormWithTitle.title);
  });
  it('Input Change Should Run updateInputMethod', () => {
    const textInput = wrapper.find('input');
    textInput.simulate('change', { target: { value: 'Hello' } });
    expect(updateInputMethod).toHaveBeenCalled();
    expect(updateInputMethod.calls.count()).toEqual(1);
  });
  it('Form Submit Should Run submitFormMethod', () => {
    const formElement = wrapper.find('form');
    formElement.simulate('submit', { preventDefault() {} });
    expect(submitFormMethod).toHaveBeenCalled();
    expect(submitFormMethod.calls.count()).toEqual(1);
  });
});
