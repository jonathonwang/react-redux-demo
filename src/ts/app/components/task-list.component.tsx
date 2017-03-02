import * as React from 'react';
import classNames from 'classnames';

import { ITask } from '../reducers/task.reducer';

interface ITaskListComponentProps {
  task: ITask;
  deleteTask(id: any): void;
  toggleComplete(task: ITask): void;
}

export class TaskListComponent extends React.Component<ITaskListComponentProps, void> {
  render() {
    const { task, deleteTask, toggleComplete } = this.props;
    const toggleBtnClassNames: string = classNames('btn', 'btn-xs', { 'btn-success': task.isComplete, 'btn-default': !task.isComplete });
    const toggleBtnIconClassNames: string = classNames('fa', { 'fa-check': task.isComplete, 'fa-circle-o': !task.isComplete });
    return (
      <li className='list-group-item' key={task.id}>
        <p>
          <button id='task-togglebtn' className={toggleBtnClassNames} onClick={() => toggleComplete(task)}>
            {/* {task.isComplete ? 'Set Incomplete' : 'Set Complete'} */}
            <span className={toggleBtnIconClassNames}></span>
            <span className='fa fa-check'></span>
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
