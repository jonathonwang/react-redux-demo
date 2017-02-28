import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/task.actions';

export interface ITask {
  id: number;
  title: string;
  isComplete: boolean;
}

export class Task implements ITask {
  id: number;
  title: string;
  isComplete: boolean;
  constructor(taskData: ITask) {
    this.id = taskData.id;
    this.title = taskData.title;
    this.isComplete = taskData.isComplete;
  }
}

export const initialState: Array<ITask> = [];

/**
 * Reducer for Task Array
 * @type {[handleActions<State>]}
 * @return {[State]}
 */
export const taskReducer = handleActions<Array<Task>>({
  [ActionTypes.INJECT_TASKS]: (state: Array<ITask>, action: Action<{ tasks: Array<ITask> }>): Array<ITask> => {
    return [...state, ...action.payload.tasks];
  },
  [ActionTypes.ADD_TASK]: (state: Array<ITask>, action: Action<ITask>): Array<ITask> => {
    return [...state, action.payload];
  },
  [ActionTypes.REMOVE_TASK]: (state: Array<ITask>, action: Action<{ id: number }>): Array<ITask> => {
    return state.filter((task) => task.id !== action.payload.id);
  },
  [ActionTypes.TOGGLE_TASK]: (state: Array<ITask>, action: Action<{ id: number }>): Array<ITask> => {
    return state.map((task) => {
      if (task.id === action.payload.id) {
        return new Task({ id: task.id, title: task.title, isComplete: !task.isComplete });
      } else {
        return task;
      }
    });
  }
}, initialState);

export default taskReducer;
