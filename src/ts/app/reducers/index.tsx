import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { taskReducer } from './task.reducer';
import { alertReducer } from './alert.reducer';
import { createFormReducer } from './create-form.reducer';

const reducers = combineReducers({
  tasks: taskReducer,
  createForm: createFormReducer,
  alert: alertReducer
});

export const store = createStore(
  reducers,
  applyMiddleware(thunk)
);
