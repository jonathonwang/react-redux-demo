import * as React from 'react';
import classNames from 'classnames';

import { Task, ITask } from '../reducers/task.reducer';

interface ITaskListComponentProps {
  task: Task;
  deleteTask(id: any): void;
  toggleComplete(task: Task): void;
}

export class TaskListComponent extends React.Component<ITaskListComponentProps, void> {
  render(): JSX.Element {
    const { task, deleteTask, toggleComplete } = this.props;
    const listItemClassNames: string = classNames('list-group-item', 'task-item', { 'task-item--completed': task.isComplete });
    const toggleBtnClassNames: string = classNames('task-togglebtn', 'btn', 'btn--task-toggle', 'btn-xs', 'btn-default', { 'completed': task.isComplete });
    const toggleBtnIconClassNames: string = classNames('fa', { 'fa-check-circle-o': task.isComplete, 'fa-circle-o': !task.isComplete });
    return (
      <li className={listItemClassNames} key={task.id}>
        <button className={toggleBtnClassNames} onClick={() => toggleComplete(task)}>
          <span className={toggleBtnIconClassNames}></span>
        </button>
        <span className='task-title'>
          {task.title}
        </span>
        <button className='btn btn-danger btn-xs pull-right' onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </li>
    );
  }
}

export default TaskListComponent;
