import { Action, createAction } from 'redux-actions';

export const ActionTypes = {
  TOGGLE_NAV: '[Navbar] Toggle Navbar Dropdown',
};

export const ToggleNavbar = createAction<any>(
  ActionTypes.TOGGLE_NAV
);
