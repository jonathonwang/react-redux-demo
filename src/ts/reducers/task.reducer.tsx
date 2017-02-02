import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/task.actions';


const initialState = [];

// export const taskReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionTypes.ADD_TODO:
//       console.log(state);
//       return [...state, '123'];
//     case ActionTypes.DELETE_TODO:
//       console.log(state);
//       return [...state];
//     default:
//       return state;
//   }
// };

export const taskReducer = handleActions<any, any>({
  [ActionTypes.ADD_TODO]: (state: any, action: Action<any>): any => {
    return [...state, '123'];
  },
  [ActionTypes.DELETE_TODO]: (state: any, action: Action<any>): any => {
    return [...state];
  }
}, initialState);

export default taskReducer;
