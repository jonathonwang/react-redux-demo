import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/task.actions';

export const initialState = [];

export const taskReducer = handleActions<any, any>({
  [ActionTypes.INJECT_TODOS]: (state: any, action: Action<any>): any => {
    return [...state, ...action.payload.tasks];
  },
  [ActionTypes.ADD_TODO]: (state: any, action: Action<any>): any => {
    return [...state, action.payload];
  },
  [ActionTypes.DELETE_TODO]: (state: any, action: Action<any>): any => {
    return state.filter((task) => task.id !== action.payload.id);
  },
  [ActionTypes.TOGGLE_TODO]: (state: any, action: Action<any>): any => {
    // console.log(state[0]);
    return state.map((task) => {
      if (task.id === action.payload.id) {
        return Object.assign({}, task, { isComplete: !task.isComplete });
      } else {
        return task;
      }
    });
  }
}, initialState);

export default taskReducer;
