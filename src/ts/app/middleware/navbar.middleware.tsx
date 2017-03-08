import { Action } from 'redux-actions';

// Sync Action Imports
import { ToggleNavbar } from '../actions/navbar.actions';

/**
 * navbarToggleMiddleware
 * Middleware to close Mobile Navbar on router Location Change
 * @return {[Action]}
 */
export const navbarToggleMiddleware = (store) => (next) => (action): Action<{}> => {
  const state = store.getState();
  const { dispatch } = store;
  if (action.type === '@@router/LOCATION_CHANGE' && state.navbar.open) {
    dispatch(ToggleNavbar());
  }
  return next(action);
};

export default navbarToggleMiddleware;
