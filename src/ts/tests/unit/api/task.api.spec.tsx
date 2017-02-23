import * as React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskComplete
} from '../../../app/api/task.api';

import { ActionTypes as TaskActionTypes } from '../../../app/actions/task.actions';
import { ActionTypes as AlertActionTypes } from '../../../app/actions/alert.actions';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Async Task API Actions', () => {
  // Begin FetchTasks Test
  describe('Fetch Tasks', () => {
    // Setup Mock Store
    let store;
    // Setup Mock Responses for Success and Fail
    const mockedTask = {title: '123', isComplete: true, id: 4};
    const testResponse = {
      success: { status: 200, responseText: JSON.stringify([mockedTask]) },
      failure: { status: 404 }
    };

    beforeEach(() => {
      jasmine.Ajax.install();
      store = mockStore({ tasks: [] });
      spyOn(store, 'dispatch').and.callThrough();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
      store.clearActions();
      store.dispatch.calls.reset();
    });
    // Success Response Tests
    describe('On Success', () => {
      it('Dispatch Correct InjectRetrievedTodos Action', (done) => {
        store.dispatch(FetchTasks())
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(1);
          expect(actions[0].type).toEqual(TaskActionTypes.INJECT_TODOS);
          expect(actions[0].payload).toEqual({ tasks: [mockedTask] });
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.success);
      });
    });
    // Failed Response Tests
    describe('On Failure', () => {
      it('Dispatch Correct ShowAlert Action', (done) => {
        store.dispatch(FetchTasks())
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(1);
          expect(actions[0].type).toEqual(AlertActionTypes.SHOW_ALERT);
          expect(actions[0].payload).toEqual({ status: 'danger', message: 'Tasks Could Not be Loaded' });
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.failure);
      });
    });
  });
  // End FetchTasks Test
});
