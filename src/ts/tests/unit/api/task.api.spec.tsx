import * as React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskIsComplete
} from '../../../app/api/task.api';

import { Task } from '../../../app/reducers/task.reducer';

import { ActionTypes as TaskActionTypes } from '../../../app/actions/task.actions';
import { ActionTypes as AlertActionTypes } from '../../../app/actions/alert.actions';
import { ActionTypes as FormActionTypes } from '../../../app/actions/create-form.actions';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Async Task API Actions', () => {
  // Begin FetchTasks Test
  describe('FetchTasks Method', () => {
    // Setup Mock Store
    let store;
    // Setup Mock Responses for Success and Fail
    const mockedTask = new Task({title: '123', isComplete: true, id: 4});
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

    // General Tests
    it('Sends a GET Request', (done) => {
      store.dispatch(FetchTasks())
      .then(() => {
        expect(request.method).toEqual('GET');
        done();
      });
      const request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(testResponse.success);
    });

    // Success Response Tests
    describe('On Success', () => {
      it('Dispatch Correct InjectRetrievedTodos Action', (done) => {
        store.dispatch(FetchTasks())
        .then(() => {
          const actions = store.getActions();
          expect(actions.length).toEqual(1);
          expect(actions[0].type).toEqual(TaskActionTypes.INJECT_TASKS);
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
  // End FetchTasks Method Test

  // CreateTask Method
  describe('CreateTask Method', () => {
    // Setup Mock Store
    let store;
    // Setup Mock Responses for Success and Fail
    const mockedTask = {title: '123', isComplete: false};
    const mockedResponseTask = { title: '123', isComplete: false, id: 10 };
    const testResponse = {
      success: { status: 200, responseText: JSON.stringify(mockedResponseTask) },
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

    // General Tests
    it('Sends a POST Request With Correct JSON', (done) => {
      store.dispatch(CreateTask(mockedTask))
      .then(() => {
        expect(request.method).toEqual('POST');
        expect(request.params).toEqual(JSON.stringify(mockedTask));
        done();
      });
      const request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(testResponse.success);
    });

    // Success Response Test
    describe('On Success', () => {
      it('Dispatch Correct Actions', (done) => {
        store.dispatch(CreateTask(mockedTask))
        .then(() => {
          const actions = store.getActions();
          const expectedActions = [
            { type: TaskActionTypes.ADD_TASK, payload: new Task(mockedResponseTask) },
            { type: FormActionTypes.CLEAR_CREATE_FORM },
            { type: AlertActionTypes.SHOW_ALERT, payload: { status: 'success', message: 'Task Successfully Created' } }
          ];
          expect(actions.length).toEqual(3);
          expect(actions).toEqual(expectedActions);
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.success);
      });
    });
    // Failure Response Test
    describe('On Failure', () => {
      it('Dispatch Correct ShowAlert Action', (done) => {
        store.dispatch(CreateTask(mockedTask))
        .then(() => {
          const actions = store.getActions();
          const expectedActions = [
            { type: AlertActionTypes.SHOW_ALERT, payload: { status: 'danger', message: 'Task Could Not Be Created' } }
          ];
          expect(actions.length).toEqual(1);
          expect(actions).toEqual(expectedActions);
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.failure);
      });
    });
    // Failure on Validation -- No Request Made
    describe('Validation Failure', () => {
      it('Dispatch Correct ShowAlert Action', (done) => {
        const emptyTitleTask = { title: '', isComplete: false };
        store.dispatch(CreateTask(emptyTitleTask));
        const actions = store.getActions();
        const expectedActions = [
          { type: AlertActionTypes.SHOW_ALERT, payload: { status: 'danger', message: 'Task Title is Required' } }
        ];
        expect(actions.length).toEqual(1);
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });
  // End Create Task Method Tests

  // Delete Task Method Tests
  describe('DeleteTask Method', () => {
    // Setup Mock Store
    let store;
    // Setup Mock Responses for Success and Fail
    const mockedTask = {title: '123', isComplete: false, id: 10};
    const testResponse = {
      success: { status: 200, responseText: JSON.stringify({}) },
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

    // General Tests
    it('Sends a DELETE Request', (done) => {
      store.dispatch(DeleteTask(mockedTask))
      .then(() => {
        expect(request.method).toEqual('DELETE');
        expect(request.params).toEqual(null);
        done();
      });
      const request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(testResponse.success);
    });

    // Success Response Test
    describe('On Success', () => {
      it('Dispatch Correct Actions', (done) => {
        store.dispatch(DeleteTask(mockedTask))
        .then(() => {
          const actions = store.getActions();
          const expectedActions = [
            { type: TaskActionTypes.REMOVE_TASK, payload: { id: 10 } },
            { type: AlertActionTypes.SHOW_ALERT, payload: { status: 'info', message: 'Task Successfully Deleted' } }
          ];
          expect(actions.length).toEqual(2);
          expect(actions).toEqual(expectedActions);
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.success);
      });
    });
    // Fail Response Test
    describe('On Failure', () => {
      it('Dispatch Correct ShowAlert Action', (done) => {
        store.dispatch(DeleteTask(mockedTask))
        .then(() => {
          const actions = store.getActions();
          const expectedActions = [
            { type: AlertActionTypes.SHOW_ALERT, payload: { status: 'danger', message: 'Task Could Not Be Deleted' } }
          ];
          expect(actions.length).toEqual(1);
          expect(actions).toEqual(expectedActions);
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.failure);
      });
    });
  });

  // Toggle Task Complete Method Tests
  describe('ToggleTaskComplete Method', () => {
    // Setup Mock Store
    let store;
    // Setup Mock Responses for Success and Fail
    const mockedTask = {title: '123', isComplete: false, id: 10};
    const testResponse = {
      success: { status: 200, responseText: JSON.stringify(mockedTask) },
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

    // General Tests
    it('Sends PUT Request with Correct JSON', (done) => {
      store.dispatch(ToggleTaskIsComplete({ task: mockedTask }))
      .then(() => {
        expect(request.method).toEqual('PUT');
        const mockedToggledTask = Object.assign({}, mockedTask, { isComplete: !mockedTask.isComplete });
        expect(request.params).toEqual(JSON.stringify(mockedToggledTask));
        done();
      });
      const request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(testResponse.success);
    });

    // Success Response Test
    describe('On Success', () => {
      it('Dispatch Correct ToggleTodoComplete Action', (done) => {
        store.dispatch(ToggleTaskIsComplete({ task: mockedTask }))
        .then(() => {
          const actions = store.getActions();
          const expectedActions = [
            { type: TaskActionTypes.TOGGLE_TASK, payload: { id: 10 } }
          ];
          expect(actions.length).toEqual(1);
          expect(actions).toEqual(expectedActions);
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.success);
      });
    });
    // Fail Response Test
    describe('On Failure', () => {
      it('Dispatch Correct ShowAlert Action', (done) => {
      store.dispatch(ToggleTaskIsComplete({ task: mockedTask }))
        .then(() => {
          const actions = store.getActions();
          const expectedActions = [
            { type: AlertActionTypes.SHOW_ALERT, payload: { status: 'danger', message: 'Task Status Could Not Be Toggled' } }
          ];
          expect(actions.length).toEqual(1);
          expect(actions).toEqual(expectedActions);
          done();
        });
        const request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(testResponse.failure);
      });
    });
  });

});
