import {} from 'jasmine';

import {
  AddTodoAction,
  DeleteTodoAction,
  ToggleTodoCompleteAction
} from '../../../app/actions/task.actions';

import { initialState, taskReducer } from '../../../app/reducers/task.reducer';

describe('Task Reducer', () => {
  it('Should Return State with Task Added', () => {
    const addedTask = { id: 1, title: '123', isComplete: false  };
    const actual = taskReducer(initialState, AddTodoAction(addedTask));
    const expected = [addedTask];
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task isComplete True', () => {
    const addedTask = { id: 1, title: '123', isComplete: false  };
    const stateWithTask = [addedTask];
    const actual = taskReducer(stateWithTask, ToggleTodoCompleteAction({ id: 1 }));
    const expected = [{ id: 1, title: '123', isComplete: true }];
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task isComplete False', () => {
    const stateWithTask = [{ id: 1, title: '123', isComplete: true }];
    const actual = taskReducer(stateWithTask, ToggleTodoCompleteAction({ id: 1 }));
    const expected = [{ id: 1, title: '123', isComplete: false }];
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Task Removed', () => {
    const stateWithTask = [{ id: 1, title: '123', isComplete: false }];
    const actual = taskReducer(stateWithTask, DeleteTodoAction({ id: 1 }));
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Should Add Task, Toggle Task, and Delete Task in Sequence', () => {
    const addedTask = { id: 1, title: '123123', isComplete: false };
    const stateWithTask = taskReducer(initialState, AddTodoAction(addedTask));
    const expectedStateWithTask = [addedTask];
    expect(stateWithTask).toEqual(expectedStateWithTask);
    const toggledTaskState = taskReducer(stateWithTask, ToggleTodoCompleteAction({ id: 1 }));
    const expectedToggledTaskState = [{ id: 1, title: '123123', isComplete: true }];
    expect(toggledTaskState).toEqual(expectedToggledTaskState);
    const stateWithoutTask = taskReducer(toggledTaskState, DeleteTodoAction({ id: 1 }));
    const expectedStateWithoutTask = [];
    expect(stateWithoutTask).toEqual(expectedStateWithoutTask);
  });
});
