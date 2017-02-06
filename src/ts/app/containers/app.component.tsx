import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { UpdateCreateFieldAction } from '../actions/create-form.actions';
import { HideAlertAction } from '../actions/alert.actions';

import { FetchTasks, CreateTask, DeleteTask, ToggleTaskComplete } from '../api/task.api';

// Component Imports
import CreateFormComponent from '../components/create-form.component';
import TaskListComponent from '../components/task-list.component';
import AlertComponent from '../components/alert.component';

interface AppComponentProps {
  tasks: Array<{ title: string; id: number; isComplete: boolean; }>;
  createForm: any;
  alert: { status: string; message: string; visible: boolean };
  dispatch: Dispatch<Object>;
}

export class AppComponent extends React.Component<AppComponentProps, void> {
  componentDidMount() {
    this.props.dispatch(FetchTasks());
  }
  render() {
    const { tasks, createForm, alert, dispatch } = this.props;

    const taskList = tasks.map((task, index) => (
      <TaskListComponent
        task={task}
        key={task.id}
        deleteTask={(id) => dispatch(DeleteTask({ id }))}
        toggleComplete={(task) => dispatch(ToggleTaskComplete({ task }))}
      />
    ));

    return (
      <div className='container mt50'>
        <div className='row'>
          <div className='col-xs-12'>
            <AlertComponent alert={alert} closeAlert={() => dispatch(HideAlertAction())}/>
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
                handleInputUpdate={(title) => dispatch(UpdateCreateFieldAction({ title }))}
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
