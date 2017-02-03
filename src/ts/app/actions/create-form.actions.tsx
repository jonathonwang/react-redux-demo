import { Action, createAction } from 'redux-actions';

export const ActionTypes = {
  UPDATE_CREATE_FORM_FIELD: '[CreateForm] Update Create Form Field',
  CLEAR_CREATE_FORM: '[CreateForm] Clear Create Form Fields'
};

export const UpdateCreateFieldAction = createAction<any, any>(
  ActionTypes.UPDATE_CREATE_FORM_FIELD,
  (title) => title
);
export const ClearCreateFormAction = createAction<any>(
  ActionTypes.CLEAR_CREATE_FORM
);
