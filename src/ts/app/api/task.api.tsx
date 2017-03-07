// Interface / Class Imports
import {
  ITask,
  Task
} from '../reducers/task.reducer';

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
 * fetchTasks
 * GET Request to Retrieve Tasks
 * @return {[Promise]}
 */
export const fetchTasks = () => {
  return fetch(`${baseUrl}/tasks`, { method: 'GET' })
  .then((response) => checkResponse(response));
};

/**
 * createTask
 * POST Request to Create new Task
 * @param  {[Object]}  taskData
 * @return {[Promise]}
 */
export const createTask = (taskData: { title: string, isComplete: boolean }) => {
  const newTaskData = JSON.stringify(taskData);
  return fetch(`${baseUrl}/tasks`, { method: 'POST', body: newTaskData, headers })
  .then((response) => checkResponse(response));
};

/**
 * deleteTask
 * @param  {[Object]} taskData
 * @return {[Promise]}
 */
export const deleteTask = (taskData: { id: number }) => {
  return fetch(`${baseUrl}/tasks/${taskData.id}`, { method: 'DELETE' })
  .then((response) => checkResponse(response));
};

/**
 * toggleTaskIsComplete
 * @param  {[Object]} taskData
 * @return {[Promise]}
 */
export const toggleTaskIsComplete = (taskData: { task: Task }) => {
  let toggleTaskData = JSON.parse(JSON.stringify(taskData)); // Shallow clone of Object to avoid reference to state Object
  toggleTaskData.task.isComplete = !toggleTaskData.task.isComplete;
  toggleTaskData = JSON.stringify(toggleTaskData.task);
  return fetch(`${baseUrl}/tasks/${taskData.task.id}`, { method: 'PUT', body: toggleTaskData, headers })
  .then((response) => checkResponse(response));
};

// Export as Object with Methods by default
export default {
  fetchTasks,
  createTask,
  deleteTask,
  toggleTaskIsComplete
};
