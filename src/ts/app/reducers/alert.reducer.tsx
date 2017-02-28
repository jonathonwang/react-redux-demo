import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/alert.actions';

export interface IAlertState {
  status: string;
  message: string;
  visible: boolean;
}

export const initialState: IAlertState = {
   status: '',
  message: '',
  visible: false
 };

export interface IAlertPayload {
  status: string;
  message: string;
}

/**
 * [Alert Reducer]
 * @type {[handleActions<State>({}, initialState)]}
 * @return {[State]}
 */
export const alertReducer = handleActions<IAlertState>({
  [ActionTypes.SHOW_ALERT]: (state: any, action: Action<IAlertPayload>): IAlertState => {
    return {
      status: action.payload.status,
      message: action.payload.message,
      visible: true
    };
  },
  [ActionTypes.HIDE_ALERT]: (state: any, action: Action<void>): IAlertState => {
    return {
      status: state.status,
      message: state.message,
      visible: false
    };
  }
}, initialState);

export default alertReducer;
