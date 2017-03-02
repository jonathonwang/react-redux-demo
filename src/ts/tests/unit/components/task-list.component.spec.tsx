import * as React from 'react';
import { shallow } from 'enzyme';

import TaskListComponent from '../../../app/components/task-list.component';

describe('Task List Component', () => {
  let wrapper;
  const deleteMethod = jasmine.createSpy('deleteMethod');
  const toggleMethod = jasmine.createSpy('toggleMethod');
  beforeEach(() => {
    const testTask = { id: 1, title: '123123', isComplete: false };
    deleteMethod.calls.reset();
    toggleMethod.calls.reset();
    wrapper = shallow(
      <TaskListComponent
        task={testTask}
        deleteTask={() => deleteMethod()}
        toggleComplete={() => toggleMethod()}
      />
    );
  });
  it('Should Render Correctly', () => {
    const wrapperElement = wrapper.type();
    expect(wrapperElement).toEqual('li');
    const wrapperClass = wrapper.props().className;
    expect(wrapperClass).toEqual('list-group-item');
  });
  it('Should Render Toggle and Delete Buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(2);
    const deleteBtn = wrapper.find('.btn-danger');
    expect(deleteBtn).toBeDefined();
    const toggleBtn = wrapper.find('.btn-primary');
    expect(toggleBtn).toBeDefined();
  });
  it('Should Display Task Title', () => {
    const taskTitle = wrapper.find('#task-title').text();
    expect(taskTitle).toBeDefined();
    expect(taskTitle).toEqual('123123');
  });
  it('Click on Delete Button Should Run Delete Function', () => {
    const deleteBtn = wrapper.find('.btn-danger');
    deleteBtn.simulate('click');
    expect(deleteMethod.calls.count()).toEqual(1);
    expect(deleteMethod).toHaveBeenCalled();
  });
  it('Click on Toggle Button Should Run Toggle Function', () => {
    const toggleBtn = wrapper.find('#task-togglebtn');
    toggleBtn.simulate('click');
    expect(toggleMethod.calls.count()).toEqual(1);
  });
});
