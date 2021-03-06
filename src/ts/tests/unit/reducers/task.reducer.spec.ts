import {} from 'jasmine';

import {
  InjectRetrievedTasks,
  AddTask,
  RemoveTask,
  ToggleTaskComplete
} from '../../../app/actions/task.actions';

import {
  initialState,
  taskReducer,
  ITask,
  Task
} from '../../../app/reducers/task.reducer';

describe('Task Reducer', () => {
  it('Should Return State with Tasks Injected', () => {
    const injectableTasks: Array<Task> = [
      new Task({ id: 1, title: '123', isComplete: false  }),
      new Task({ id: 2, title: '123', isComplete: false  })
    ];
    const actual = taskReducer(initialState, InjectRetrievedTasks({ tasks: injectableTasks }));
    const expected = injectableTasks;
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task Added', () => {
    const addedTask = new Task({ id: 1, title: '123', isComplete: false  });
    const actual = taskReducer(initialState, AddTask({ task: addedTask}));
    const expected = [addedTask];
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task isComplete True', () => {
    const addedTask = new Task({ id: 1, title: '123', isComplete: false  });
    const stateWithTask = [addedTask];
    const actual = taskReducer(stateWithTask, ToggleTaskComplete({ id: 1 }));
    const expected = [new Task({ id: 1, title: '123', isComplete: true })];
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task isComplete False', () => {
    const stateWithTask = [ new Task({ id: 1, title: '123', isComplete: true })];
    const actual = taskReducer(stateWithTask, ToggleTaskComplete({ id: 1 }));
    const expected = [new Task({ id: 1, title: '123', isComplete: false })];
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task Removed', () => {
    const stateWithTask = [new Task({ id: 1, title: '123', isComplete: false })];
    const actual = taskReducer(stateWithTask, RemoveTask({ id: 1 }));
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Should Add Task, Toggle Task, and Delete Task in Sequence', () => {
    const addedTask = new Task({ id: 1, title: '123123', isComplete: false });
    const stateWithTask = taskReducer(initialState, AddTask({ task: addedTask }));
    const expectedStateWithTask = [addedTask];
    expect(stateWithTask).toEqual(expectedStateWithTask);
    const toggledTaskState = taskReducer(stateWithTask, ToggleTaskComplete({ id: 1 }));
    const expectedToggledTaskState = [new Task({ id: 1, title: '123123', isComplete: true })];
    expect(toggledTaskState).toEqual(expectedToggledTaskState);
    const stateWithoutTask = taskReducer(toggledTaskState, RemoveTask({ id: 1 }));
    const expectedStateWithoutTask = [];
    expect(stateWithoutTask).toEqual(expectedStateWithoutTask);
  });
});
