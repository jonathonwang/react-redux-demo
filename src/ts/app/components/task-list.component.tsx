import * as React from 'react';
import classNames from 'classnames';

import { Task, ITask } from '../reducers/task.reducer';

interface ITaskListComponentProps {
  task: Task;
  deleteTask(id: any): void;
  toggleComplete(task: Task): void;
}

export class TaskListComponent extends React.Component<ITaskListComponentProps, void> {
  render() {
    const { task, deleteTask, toggleComplete } = this.props;
    const toggleBtnClassNames: string = classNames('btn', 'btn--task-toggle', 'btn-xs', 'btn-default', { 'completed': task.isComplete });
    const toggleBtnIconClassNames: string = classNames('fa', { 'fa-check': task.isComplete, 'fa-circle-o': !task.isComplete });
    return (
      <li className='list-group-item' key={task.id}>
        <p>
          <button id='task-togglebtn' className={toggleBtnClassNames} onClick={() => toggleComplete(task)}>
            <span className={toggleBtnIconClassNames}></span>
          </button>
          <span id='task-title' style={{'marginLeft': '10px'}}>
            <strong>{task.title}</strong>
          </span>
          <button className='btn btn-danger btn-xs pull-right' onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </p>
      </li>
    );
  }
}

export default TaskListComponent;
