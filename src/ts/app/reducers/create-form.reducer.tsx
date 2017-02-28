import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '../actions/create-form.actions';

export interface ICreateFormState {
  title: string;
  isComplete: boolean;
}

export const initialState: ICreateFormState = {
  title: '',
  isComplete: false
};

/**
 * [Create Form Reducer]
 * @type {[handleActions<State>({}, initialState)]}
 */
export const createFormReducer = handleActions<ICreateFormState>({
  [ActionTypes.UPDATE_CREATE_FORM_FIELD]: (state: ICreateFormState, action: Action<{ title: string }>): ICreateFormState => {
    return {
      title: action.payload.title,
      isComplete: state.isComplete
    };
  },
  [ActionTypes.CLEAR_CREATE_FORM]: (state: ICreateFormState, action: Action<void>): ICreateFormState => {
    return {
      title: '',
      isComplete: false
    };
  }
}, initialState);

export default createFormReducer;
