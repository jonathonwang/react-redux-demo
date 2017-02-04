import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/alert.actions';

interface IAlertState {
  status: string;
  message: string;
  visible: boolean;
}

export const initialState: IAlertState = { status: '', message: '', visible: false };

export const alertReducer = handleActions<any, any>({
  [ActionTypes.SHOW_ALERT]: (state: any, action: Action<any>): any => {
    return {
      status: action.payload.status,
      message: action.payload.message,
      visible: true
    };
  },
  [ActionTypes.HIDE_ALERT]: (state: any, action: Action<any>): any => {
    return {
      status: state.status,
      message: state.message,
      visible: false
    };
  }
}, initialState);

export default alertReducer;
