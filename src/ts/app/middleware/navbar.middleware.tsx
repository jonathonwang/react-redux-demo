// Sync Action Imports
import { ToggleNavbar } from '../actions/navbar.actions';

export const navbarToggleMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { dispatch } = store;
  if (action.type === '@@router/LOCATION_CHANGE' && state.navbar.open) {
    dispatch(ToggleNavbar());
  }
  return next(action);
};

export default navbarToggleMiddleware;
