import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';

import TaskListComponent from '../../../app/components/task-list.component';

describe('Task List Component', () => {
  let renderer: TestUtils.ShallowRenderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
    const testTask = { id: 1, title: '123123', isComplete: false };
    renderer.render(
      <TaskListComponent task={testTask} deleteTask={(test) => test} toggleComplete={(test) => test} />
    );
  });

  it('Should Render Correctly', () => {
    const result = renderer.getRenderOutput();
    expect(result.type).toEqual('li');
    expect(result.props.className).toEqual('list-group-item');
    expect(result.props.children.type).toEqual('p');
    expect(result.key).toEqual('1');
  });

});
