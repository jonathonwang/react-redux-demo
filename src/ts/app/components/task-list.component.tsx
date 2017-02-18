import * as React from 'react';

import { ITask } from '../reducers/task.reducer';

interface ITaskListComponentProps {
  task: ITask;
  deleteTask(id: any): void;
  toggleComplete(task: ITask): void;
}

export class TaskListComponent extends React.Component<ITaskListComponentProps, void> {
  render() {
    const { task, deleteTask, toggleComplete } = this.props;
    return (
      <li className='list-group-item' key={task.id}>
        <p>
          <button className='btn btn-primary btn-xs' onClick={() => toggleComplete(task)}>
            {task.isComplete ? 'Set Incomplete' : 'Set Complete'}
          </button>
          <span style={{'marginLeft': '10px'}}>id: {task.id}</span>
          <span style={{'marginLeft': '10px'}}>title: {task.title}</span>
          <span style={{'marginLeft': '10px'}}>isComplete: {task.isComplete + ''}</span>

          <button className='btn btn-danger btn-xs pull-right' onClick={() => deleteTask(task.id)}>Delete</button>
        </p>
      </li>
    );
  }
}

export default TaskListComponent;
