import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

import TaskListComponent from '../../../app/components/task-list.component';

describe('Task List Component', () => {
  let wrapper;
  let deleteMethod = jasmine.createSpy('deleteMethod');
  let toggleMethod = jasmine.createSpy('toggleMethod');
  beforeEach(() => {
    const testTask = { id: 1, title: '123123', isComplete: false };
    wrapper = shallow(
      <TaskListComponent
        task={testTask}
        deleteTask={() => deleteMethod()}
        toggleComplete={() => toggleMethod()}
      />
    );
  });
  it('Should Render Two Buttons', () => {
    expect(wrapper.find('button').length).toEqual(2);
  });
  it('Should Display Task Title', () => {
    const titleText = wrapper.find('#task-title').text();
    expect(titleText).toBeDefined();
    expect(titleText).toEqual('title: 123123');
  });
  it('Click on Delete Button Should Run Delete Function', () => {
    const deleteBtn = wrapper.find('.btn-danger');
    deleteBtn.simulate('click');
    expect(deleteMethod.calls.count()).toEqual(1);
  });
  it('Click on Toggle Button Should Run Toggle Function', () => {
    const toggleBtn = wrapper.find('.btn-primary');
    toggleBtn.simulate('click');
    expect(toggleMethod.calls.count()).toEqual(1);
  });
});
