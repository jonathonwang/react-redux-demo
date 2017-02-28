import { Action, createAction } from 'redux-actions';

import { ITask, Task } from '../reducers/task.reducer';

export const ActionTypes = {
  INJECT_TASKS: '[Tasks] Inject Retrieved Tasks',
  ADD_TASK: '[Tasks] Add Task',
  REMOVE_TASK: '[Tasks] Delete Task',
  TOGGLE_TASK: '[Tasks] Toggle Task Complete'
};

export const InjectRetrievedTasks = createAction<any>(
  ActionTypes.INJECT_TASKS
);
export const AddTask = createAction<any>(
  ActionTypes.ADD_TASK
);
export const RemoveTask = createAction<any>(
  ActionTypes.REMOVE_TASK
);
export const ToggleTaskComplete = createAction<any>(
  ActionTypes.TOGGLE_TASK
);
