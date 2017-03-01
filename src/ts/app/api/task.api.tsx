import { createAction, Action } from 'redux-actions';
import { Dispatch } from 'react-redux';

// Task Action Imports
import {
  InjectRetrievedTasks,
  AddTask,
  RemoveTask,
  ToggleTaskComplete
} from '../actions/task.actions';

// Alert Action Imports
import {
  ShowAlert,
  HideAlert
} from '../actions/alert.actions';

// Create Form Action Imports
import { ClearCreateForm } from '../actions/create-form.actions';

// Interface / Class Imports
import {
  ITask,
  Task
} from '../reducers/task.reducer';

import { ICreateFormState } from '../reducers/create-form.reducer';

// Base Url Constant
const baseUrl = 'http://localhost:3000';

// Setup Headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');

/**
 * checkResponse Helper to be used for AJAX Promises
 * @param  {[Response]} response [Response from API]
 * @return {[Response]}
 */
const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Network response was not ok:' + response);
};

/**
 * Async FetchTasks
 * GET Request to retrieve tasks from API
 */
export const FetchTasks = () => {
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks`, { method: 'GET' })
    .then((response) => checkResponse(response))
    .then((response) => {
      const tasks: Array<Task> = response.map((task) => new Task(task));
      dispatch(InjectRetrievedTasks({ tasks }));
    })
    .catch((error) => dispatch(ShowAlert({ status: 'danger', message: 'Tasks Could Not be Loaded' })));
  };
};

/**
 * Async CreateTask
 * POST Request to Create New Task
 * Also checks length of title before sending Request
 * @param {[Object]} taskData
 */
export const CreateTask = (taskData: { title: string, isComplete: boolean }) => {
  const newTaskData = JSON.stringify(taskData);
    return (dispatch) => {
      if (taskData.title) {
        return fetch(`${baseUrl}/tasks`, { method: 'POST', body: newTaskData, headers })
        .then((response) => checkResponse(response))
        .then((response) => {
          const task = new Task(response);
          dispatch(AddTask({ task }));
          dispatch(ClearCreateForm());
          dispatch(ShowAlert({ status: 'success', message: 'Task Successfully Created' }));
        })
        .catch((error) => dispatch(ShowAlert({ status: 'danger', message: 'Task Could Not Be Created' })));
      } else {
        dispatch(ShowAlert({ status: 'danger', message: 'Task Title is Required' }));
      }
  };
};

/**
 * Async Delete Task
 * DELETE Request to Delete Task
 * @param {[Object]} taskData [{ id: number }]
 */
export const DeleteTask = (taskData: { id: number }) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks/${taskData.id}`, { method: 'DELETE' })
    .then((response) => checkResponse(response))
    .then((response) => {
      dispatch(RemoveTask({ id: taskData.id }));
      dispatch(ShowAlert({ status: 'info', message: 'Task Successfully Deleted' }));
    })
    .catch((error) => dispatch(ShowAlert({ status: 'danger', message: 'Task Could Not Be Deleted' })));
  };
};

/**
 * Async ToggleTaskIsComplete
 * PUT Request to toggle Task isComplete
 * @param {[Object]} taskData
 */
export const ToggleTaskIsComplete = (taskData: { task: Task }) => {
  let toggleTaskData = JSON.parse(JSON.stringify(taskData)); // Shallow clone of Object to avoid reference to state Object
  toggleTaskData.task.isComplete = !toggleTaskData.task.isComplete;
  toggleTaskData = JSON.stringify(toggleTaskData.task);
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks/${taskData.task.id}`, { method: 'PUT', body: toggleTaskData, headers })
    .then((response) => checkResponse(response))
    .then((response) => dispatch(ToggleTaskComplete({ id: taskData.task.id })))
    .catch((error) => dispatch(ShowAlert({ status: 'danger', message: 'Task Status Could Not Be Toggled' })));
  };
};

// Export as Object containing methods by default
export default {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskComplete
};
