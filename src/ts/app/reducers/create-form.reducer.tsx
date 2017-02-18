import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/create-form.actions';

export interface ICreateFormState {
  title: string;
  isComplete: boolean;
}

const initialState: ICreateFormState = {
  title: '',
  isComplete: false
};

export const createFormReducer = handleActions<ICreateFormState>({
  [ActionTypes.UPDATE_CREATE_FORM_FIELD]: (state: any, action: Action<any>): any => {
    return {
      title: action.payload.title,
      isComplete: state.isComplete
    };
  },
  [ActionTypes.CLEAR_CREATE_FORM]: (state: any, action: Action<any>): any => {
    return {
      title: '',
      isComplete: false
    };
  }
}, initialState);

export default createFormReducer;
