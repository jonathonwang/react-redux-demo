import { createAction, Action } from 'redux-actions';

import { AddTodoAction, InjectRetrievedTodos } from '../actions/task.actions';

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
        (response) => console.log(response)
      );
    });
  };
};
export const CreateTask = () => {
  fetch(baseUrl)
    .then((response) => {
      checkResponse(response, AddTodoAction(response), (response) => console.log(response));
  });
};


export default {
  FetchTasks,
  CreateTask,
};
