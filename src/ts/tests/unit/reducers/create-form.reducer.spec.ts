import {} from 'jasmine';

import {
  createFormReducer,
  initialState
} from '../../../app/reducers/create-form.reducer';

import {
  UpdateCreateField,
  ClearCreateForm
} from '../../../app/actions/create-form.actions';

describe('Create Form Reducer', () => {
  it('Should Return State with Updated Title', () => {
    const actual = createFormReducer(initialState, UpdateCreateField({ title: '123123' }));
    const expected = { title: '123123', isComplete: false };
  });
  it('Should Return State with Title Cleared', () => {
    const stateWithTitle = createFormReducer(initialState, UpdateCreateField({ title: '123123' }));
    const expectedStateWithTitle = { title: '123123', isComplete: false };
    expect(stateWithTitle).toEqual(expectedStateWithTitle);
    const actualClearedState = createFormReducer(stateWithTitle, ClearCreateForm());
    const expectedClearedState = { title: '', isComplete: false };
    expect(actualClearedState).toEqual(expectedClearedState);
  });
});
