import {} from 'jasmine';

import { navbarReducer, initialState } from '../../../app/reducers/navbar.reducer';
import { ToggleNavbar } from '../../../app/actions/navbar.actions';

describe('Navbar Reducer', () => {
  it('Should have Initial State Open False' , () => {
    const expectedState = { open: false };
    expect(initialState).toEqual(expectedState);
  });
  it('Should Return State with Open True', () => {
    const actual = navbarReducer(initialState, ToggleNavbar());
    const expected = { open: true };
    expect(actual).toEqual(expected);
  });
  it('Should Return State with Open False', () => {
    const openState = { open: true };
    const actual = navbarReducer(openState, ToggleNavbar());
    const expected = { open: false };
    expect(actual).toEqual(expected);
  });
});
