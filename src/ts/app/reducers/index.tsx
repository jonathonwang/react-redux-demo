// NPM Imports
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

// Reducer Imports
import { taskReducer } from './task.reducer';
import { alertReducer } from './alert.reducer';
import { createFormReducer } from './create-form.reducer';
import { navbarReducer } from './navbar.reducer';

// Middleware
import { navbarToggleMiddleware } from '../middleware/navbar.middleware';

/**
 * [Combine Reducers to One Object]
 * {stateProperty: reducer}
 * @type {[Object]}
 */
const reducers = combineReducers({
  routing: routerReducer,
  tasks: taskReducer,
  createForm: createFormReducer,
  alert: alertReducer,
  navbar: navbarReducer
});

/**
 * [Middleware]
 * @type {[Array of Middleware]}
 */
const middleware = applyMiddleware(
  thunk,
  navbarToggleMiddleware
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
