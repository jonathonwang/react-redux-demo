import { createAction, Action } from 'redux-actions';

import {
  InjectRetrievedTodos,
  AddTodoAction,
  DeleteTodoAction,
  ToggleTodoCompleteAction
} from '../actions/task.actions';

import {
  ShowAlertAction,
  HideAlertAction
} from '../actions/alert.actions';

import {
  ClearCreateFormAction
} from '../actions/create-form.actions';

const baseUrl = 'http://localhost:3000';

// // Setup Headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');

// Helper for Checking Response OK
const checkResponse = (response, successCb: any, errorCb: any) => {
  if (response.ok) {
    response.json()
    .then((data) => successCb(data));
  } else {
    errorCb(response);
  }
};

export const FetchTasks = () => {
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks`, { method: 'GET' })
    .then((response) => {
      checkResponse(
        response,
        (response) => dispatch(InjectRetrievedTodos({ tasks: response })),
        (response) => ShowAlertAction({ status: 'danger', message: 'Tasks Could Not be Loaded' })
      );
    });
  };
};
export const CreateTask = (taskData) => {
  const newTaskData = JSON.stringify(taskData);
  return (dispatch) => {
    if (taskData.title) {
    return fetch(`${baseUrl}/tasks`, { method: 'POST', body: newTaskData, headers })
    .then((response) => {
      checkResponse(
        response,
        (response) => {
          dispatch(AddTodoAction(response));
          dispatch(ClearCreateFormAction());
          dispatch(ShowAlertAction({ status: 'success', message: 'Task Successfully Created' }));
        },
        (error) => {
          dispatch(ShowAlertAction({ status: 'danger', message: 'Task Could Not Be Created' }));
        }
      );
    });
  } else {
    return dispatch(ShowAlertAction({ status: 'danger', message: 'Task Title is Required' }));
  }
  };
};
export const DeleteTask = (taskData) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks/${taskData.id}`, { method: 'DELETE' })
    .then((response) => {
      checkResponse(
        response,
        (response) => {
          dispatch(DeleteTodoAction({ id: taskData.id }));
          dispatch(ShowAlertAction({ status: 'info', message: 'Task Successfully Deleted' }));
        },
        (error) => dispatch(ShowAlertAction({ status: 'danger', message: 'Task Could Not Be Deleted' }))
      );
    });
  };
};
export const ToggleTaskComplete = (taskData) => {
  let toggleTaskData = JSON.parse(JSON.stringify(taskData)); // Deep clone of Object to avoid reference to state Object
  toggleTaskData.task.isComplete = !toggleTaskData.task.isComplete;
  toggleTaskData = JSON.stringify(toggleTaskData.task);
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/tasks/${taskData.task.id}`, { method: 'PUT', body: toggleTaskData, headers })
    .then((response) => {
      checkResponse(
        response,
        (response) => dispatch(ToggleTodoCompleteAction({ id: taskData.task.id })),
        (error) => dispatch(ShowAlertAction({ status: 'danger', message: 'Task Could Not Be Toggled Complete' }))
      );
    });
  };
};


export default {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskComplete
};
