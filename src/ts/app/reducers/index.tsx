import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { taskReducer } from './task.reducer';
import { alertReducer } from './alert.reducer';
import { createFormReducer } from './create-form.reducer';

/**
 * [Combine Reducers to One Object]
 * {stateProperty: reducer}
 * @type {[Object]}
 */
const reducers = combineReducers({
  tasks: taskReducer,
  createForm: createFormReducer,
  alert: alertReducer
});

/**
 * [Middleware]
 * @type {[Array of Middleware]}
 */
const middleware = applyMiddleware(
  thunk
);

/**
 * [Create Store]
 * {Combined Reducers and Middleware}
 * @type {[Store]}
 */
export const store = createStore(
  reducers,
  middleware
);
