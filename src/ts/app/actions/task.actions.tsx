import { Action, createAction } from 'redux-actions';

export const ActionTypes = {
  ADD_TODO: '[Tasks] Add Todo',
  DELETE_TODO: '[Tasks] Delete Todo',
  TOGGLE_TODO: '[Tasks] Toggle Todo Complete'
};

export const AddTodoAction = createAction<any>(
  ActionTypes.ADD_TODO
);
export const DeleteTodoAction = createAction<any>(
  ActionTypes.DELETE_TODO
);
export const ToggleTodoCompleteAction = createAction<any>(
  ActionTypes.TOGGLE_TODO
);
