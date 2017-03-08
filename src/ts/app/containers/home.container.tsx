import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

// Sync Action Imports
import { UpdateCreateField } from '../actions/create-form.actions';
import { HideAlert } from '../actions/alert.actions';

// Async Action Imports
import {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskIsComplete
} from '../async-actions/task.async-actions';

// Component Imports
import CreateFormComponent from '../components/create-form.component';
import TaskListComponent from '../components/task-list.component';
import EmptyListComponent from '../components/empty-list.component';

// Interface Imports
import { ITask, Task } from '../reducers/task.reducer';
import { ICreateFormState } from '../reducers/create-form.reducer';

// App Component Props
interface IHomeComponentProps {
  tasks: Array<ITask>;
  createForm: ICreateFormState;
  dispatch: Dispatch<Object>;
}

export class HomeComponent extends React.Component<IHomeComponentProps, void> {
  render(): JSX.Element {
    const { tasks, createForm, dispatch } = this.props;

    const taskList: Array<JSX.Element> = tasks.map((task): JSX.Element => (
      <TaskListComponent
        task={task}
        key={task.id}
        deleteTask={(id: number) => dispatch(DeleteTask({ id }))}
        toggleComplete={(task: Task) => dispatch(ToggleTaskIsComplete({ task }))}
      />
    ));

    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 className='text-center'>Tasks</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <ul className='list-group task-list-group'>
              <CreateFormComponent
                createForm={createForm}
                handleInputUpdate={(title) => dispatch(UpdateCreateField({ title }))}
                handleSubmitForm={() => dispatch(CreateTask(createForm))}
              />
              {tasks.length > 0 ? taskList : <EmptyListComponent/>}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  tasks: state.tasks,
  createForm: state.createForm
});

const Home = connect(mapStateToProps)(HomeComponent);

export default Home;
