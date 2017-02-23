import { createAction, Action } from 'redux-actions';

// Task Action Imports
import {
  InjectRetrievedTodos,
  AddTodoAction,
  DeleteTodoAction,
  ToggleTodoCompleteAction
} from '../actions/task.actions';

// Alert Action Imports
import {
  ShowAlertAction,
  HideAlertAction
} from '../actions/alert.actions';

// Create Form Action Imports
import {
  ClearCreateFormAction
} from '../actions/create-form.actions';

// Interface Imports
import { ITask } from '../reducers/task.reducer';

// Base Url Constant
const baseUrl = 'http://localhost:3000';

// Setup Headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');

// Helper for Checking Response OK
const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Network response was not ok.');
};

// GET Request to Fetch all tasks in DB
export const FetchTasks = () => {
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks`, { method: 'GET' })
    .then((response) => checkResponse(response))
    .then((response) => dispatch(InjectRetrievedTodos({ tasks: response })))
    .catch((error) => dispatch(ShowAlertAction({ status: 'danger', message: 'Tasks Could Not be Loaded' })));
  };
};

// POST Request to Create new Task
// Also checks length of title before sending Request
export const CreateTask = (taskData) => {
  const newTaskData = JSON.stringify(taskData);
    return (dispatch) => {
      if (taskData.title) {
        return fetch(`${baseUrl}/tasks`, { method: 'POST', body: newTaskData, headers })
        .then((response) => checkResponse(response))
        .then((response) => {
          dispatch(AddTodoAction(response));
          dispatch(ClearCreateFormAction());
          dispatch(ShowAlertAction({ status: 'success', message: 'Task Successfully Created' }));
        })
        .catch((error) => dispatch(ShowAlertAction({ status: 'danger', message: 'Task Could Not Be Created' })));
      } else {
        dispatch(ShowAlertAction({ status: 'danger', message: 'Task Title is Required' }));
      }
  };
};

// DELETE Request to delete Task
export const DeleteTask = (taskData) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/tasks/${taskData.id}`, { method: 'DELETE' })
    .then((response) => checkResponse(response))
    .then((response) => {
      dispatch(DeleteTodoAction({ id: taskData.id }));
      dispatch(ShowAlertAction({ status: 'info', message: 'Task Successfully Deleted' }));
    })
    .catch((error) => dispatch(ShowAlertAction({ status: 'danger', message: 'Task Could Not Be Deleted' })));
  };
};

// PUT Request to toggle Task isComplete
export const ToggleTaskComplete = (taskData) => {
  let toggleTaskData = JSON.parse(JSON.stringify(taskData)); // Shallow clone of Object to avoid reference to state Object
  toggleTaskData.task.isComplete = !toggleTaskData.task.isComplete;
  toggleTaskData = JSON.stringify(toggleTaskData.task);
  return (dispatch, getState) => {
    return fetch(`${baseUrl}/tasks/${taskData.task.id}`, { method: 'PUT', body: toggleTaskData, headers })
    .then((response) => checkResponse(response))
    .then((response) => dispatch(ToggleTodoCompleteAction({ id: taskData.task.id })))
    .catch((error) => dispatch(ShowAlertAction({ status: 'danger', message: 'Task Could Not Be Toggled Complete' })));
  };
};

// Export as Object containing methods by default
export default {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskComplete
};
