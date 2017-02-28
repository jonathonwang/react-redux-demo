import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

// Sync Action Imports
import { UpdateCreateField } from '../actions/create-form.actions';
import { HideAlert } from '../actions/alert.actions';

// Component Imports
import CreateFormComponent from '../components/create-form.component';
import TaskListComponent from '../components/task-list.component';
import AlertComponent from '../components/alert.component';

// Interface Imports
import { ITask } from '../reducers/task.reducer';
import { ICreateFormState } from '../reducers/create-form.reducer';
import { IAlertState } from '../reducers/alert.reducer';

// Async Action Imports
import {
  FetchTasks,
  CreateTask,
  DeleteTask,
  ToggleTaskIsComplete
} from '../api/task.api';

// App Component Props
interface IAppComponentProps {
  tasks: Array<ITask>;
  createForm: ICreateFormState;
  alert: IAlertState;
  dispatch: Dispatch<Object>;
}

// App Component State
interface IAppComponentState {
  dispatch: Dispatch<any>;
  componentDidMount(): void;
  render(): JSX.Element;
}

export class AppComponent extends React.Component<IAppComponentProps, void> {
  private componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(FetchTasks());
  }
  render(): JSX.Element {
    const { tasks, createForm, alert, dispatch } = this.props;

    const taskList: Array<JSX.Element> = tasks.map((task): JSX.Element => (
      <TaskListComponent
        task={task}
        key={task.id}
        deleteTask={(id) => dispatch(DeleteTask({ id }))}
        toggleComplete={(task) => dispatch(ToggleTaskIsComplete({ task }))}
      />
    ));

    return (
      <div className='container mt50'>
        <div className='row'>
          <div className='col-xs-12'>
            <AlertComponent alert={alert} closeAlert={() => dispatch(HideAlert())}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1 className='text-center'>Task App</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <ul className='list-group'>
              <CreateFormComponent
                createForm={createForm}
                handleInputUpdate={(title) => dispatch(UpdateCreateField({ title }))}
                handleSubmitForm={() => dispatch(CreateTask(createForm))}
              />
              {taskList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  createForm: state.createForm,
  alert: state.alert
});

const App = connect(mapStateToProps)(AppComponent);

export default App;
