import { Action, createAction } from 'redux-actions';

export const ActionTypes = {
  SHOW_ALERT: '[Alert] Show Alert',
  HIDE_ALERT: '[Alert] Hide Alert'
};

export const ShowAlertAction = createAction<any>(
  ActionTypes.SHOW_ALERT
);
export const HideAlertAction = createAction<any>(
  ActionTypes.HIDE_ALERT
);
