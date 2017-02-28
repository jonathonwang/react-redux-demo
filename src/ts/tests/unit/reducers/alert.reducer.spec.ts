import {} from 'jasmine';

import {
  alertReducer,
  initialState
} from '../../../app/reducers/alert.reducer';

import {
  ShowAlert,
  HideAlert
} from '../../../app/actions/alert.actions';

describe('Alert Reducer', () => {
  it('Should Return State With Alert Status, Message, and Visible', () => {
    const actual = alertReducer(initialState, ShowAlert({ status: 'danger', message: 'Danger Message' }));
    const expected = { status: 'danger', message: 'Danger Message', visible: true };
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Alert Visible: false', () => {
    const visibleAlertState = alertReducer(initialState, ShowAlert({ status: 'danger', message: 'Danger Message' }));
    const expectedVisibleAlertState = { status: 'danger', message: 'Danger Message', visible: true };
    expect(visibleAlertState).toEqual(expectedVisibleAlertState);
    const hiddenAlertState = alertReducer(visibleAlertState, HideAlert());
    const expectedHiddenAlertState = { status: 'danger', message: 'Danger Message', visible: false };
    expect(hiddenAlertState).toEqual(expectedHiddenAlertState);
  });
});
