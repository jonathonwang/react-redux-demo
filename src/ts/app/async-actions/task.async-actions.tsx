import { Dispatch } from 'react-redux';
import { createAction, Action } from 'redux-actions';

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

// API Imports
import {
  fetchTasks,
  createTask,
  deleteTask,
  toggleTaskIsComplete
} from '../api/task.api';

/**
 * Async FetchTasks
 * GET Request to retrieve tasks from API
 */
export const FetchTasks = () => {
  return (dispatch) => {
    return fetchTasks()
    .then((response) => dispatch(InjectRetrievedTasks({ tasks: response })))
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
    return (dispatch) => {
      if (taskData.title) {
        return createTask(taskData)
        .then((response) => {
          dispatch(AddTask({ task: response }));
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
    return deleteTask(taskData)
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
  return (dispatch) => {
    return toggleTaskIsComplete(taskData)
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
