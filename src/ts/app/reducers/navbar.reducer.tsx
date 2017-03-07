import * as React from 'react';
import { handleActions, Action } from 'redux-actions';

import { ActionTypes } from '../actions/navbar.actions';

export interface INavbarState {
  open: boolean;
}

export const initialState: INavbarState = {
  open: false
};

/**
 * navbarReducer
 * @type {[handleActions<State>({}, initialState)]}
 */
export const navbarReducer = handleActions<INavbarState>({
  [ActionTypes.TOGGLE_NAV]: (state: INavbarState, action: Action<{}>): INavbarState => {
    return {
      open: !state.open
    };
  }
}, initialState);

export default navbarReducer;
