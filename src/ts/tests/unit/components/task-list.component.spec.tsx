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
  it('Should Display Task Id', () => {
    const taskId = wrapper.find('#task-id').text();
    expect(taskId).toBeDefined();
    expect(taskId).toEqual('id: 1');
  });
  it('Should Display Task Title', () => {
    const taskTitle = wrapper.find('#task-title').text();
    expect(taskTitle).toBeDefined();
    expect(taskTitle).toEqual('title: 123123');
  });
  it('Should Display Task isComplete', () => {
    const taskIsComplete = wrapper.find('#task-status').text();
    expect(taskIsComplete).toBeDefined();
    expect(taskIsComplete).toEqual('isComplete: false');
  });
  it('Click on Delete Button Should Run Delete Function', () => {
    const deleteBtn = wrapper.find('.btn-danger');
    deleteBtn.simulate('click');
    expect(deleteMethod.calls.count()).toEqual(1);
    expect(deleteMethod).toHaveBeenCalled();
  });
  it('Click on Toggle Button Should Run Toggle Function', () => {
    const toggleBtn = wrapper.find('.btn-primary');
    toggleBtn.simulate('click');
    expect(toggleMethod.calls.count()).toEqual(1);
  });
});
