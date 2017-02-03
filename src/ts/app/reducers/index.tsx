import { combineReducers, createStore } from 'redux';

import { taskReducer } from './task.reducer';
import { createFormReducer } from './create-form.reducer';

const reducers = combineReducers({
  tasks: taskReducer,
  createForm: createFormReducer
});

export const store = createStore(reducers);
