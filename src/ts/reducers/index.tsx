import { taskReducer } from './task.reducer';
import { combineReducers, createStore } from 'redux';

const reducers = combineReducers({
  tasks: taskReducer
});

export const store = createStore(reducers);
