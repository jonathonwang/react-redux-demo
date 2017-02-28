import { Action, createAction } from 'redux-actions';

export const ActionTypes = {
  UPDATE_CREATE_FORM_FIELD: '[CreateForm] Update Create Form Field',
  CLEAR_CREATE_FORM: '[CreateForm] Clear Create Form Fields'
};

export const UpdateCreateField = createAction<any, { title: string }>(
  ActionTypes.UPDATE_CREATE_FORM_FIELD,
  (payload): { title: string } => payload
);
export const ClearCreateForm = createAction<any>(
  ActionTypes.CLEAR_CREATE_FORM
);
