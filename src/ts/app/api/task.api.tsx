// Interface / Class Imports
import {
  ITask,
  Task
} from '../reducers/task.reducer';

// Base Url Constant
const baseUrl = 'http://localhost:3000';

// Setup Headers
const headers = new Headers({
  'Content-Type': 'application/json'
});

/**
 * checkResponse Helper to be used for AJAX Promises
 * Checks to make sure response is ok then resolves with JSON returned
 * Or throws an error to be caught by async action with .catch();
 * @param  {[Response]} response
 * @return {[JSON]}
 */
const checkResponse = (response: Response): Promise<JSON> | never => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Network response was not ok:' + response);
};

/**
 * fetchTasks
 * GET Request to Retrieve Tasks
 * @return {[Promise]} || {[Never]}
 */
export const fetchTasks = (): Promise<JSON> | never => {
  return fetch(`${baseUrl}/tasks`, { method: 'GET' })
  .then((response) => checkResponse(response));
};

/**
 * createTask
 * POST Request to Create new Task
 * @param  {[Object]}  taskData
 * @return {[Promise]}
 */
export const createTask = (taskData: { title: string, isComplete: boolean }): Promise<JSON> | never => {
  const newTaskData = JSON.stringify(taskData);
  return fetch(`${baseUrl}/tasks`, { method: 'POST', body: newTaskData, headers })
  .then((response) => checkResponse(response));
};

/**
 * deleteTask
 * @param  {[Object]} taskData
 * @return {[Promise]}
 */
export const deleteTask = (taskData: { id: number }): Promise<JSON> | never => {
  return fetch(`${baseUrl}/tasks/${taskData.id}`, { method: 'DELETE' })
  .then((response) => checkResponse(response));
};

/**
 * toggleTaskIsComplete
 * @param  {[Object]} taskData
 * @return {[Promise]}
 */
export const toggleTaskIsComplete = (taskData: { task: Task }): Promise<JSON> | never => {
  // Shallow clone of Object to avoid reference to state Object
  let toggleTaskData = JSON.parse(JSON.stringify(taskData));
  // Toggle the task isComplete property before sending out the request
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
