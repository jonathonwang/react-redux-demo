import { Action, createAction } from 'redux-actions';

import { IAlertState, IAlertPayload } from '../reducers/alert.reducer';

export const ActionTypes = {
  SHOW_ALERT: '[Alert] Show Alert',
  HIDE_ALERT: '[Alert] Hide Alert'
};

export const ShowAlert = createAction<any>(
  ActionTypes.SHOW_ALERT
);
export const HideAlert = createAction<any>(
  ActionTypes.HIDE_ALERT
);
