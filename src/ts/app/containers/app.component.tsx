import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AddTodoAction, DeleteTodoAction, ToggleTodoCompleteAction } from '../actions/task.actions';

import { UpdateCreateFieldAction, ClearCreateFormAction } from '../actions/create-form.actions';
import { ShowAlertAction, HideAlertAction } from '../actions/alert.actions';

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
  validateTask() {
    const { createForm } = this.props;
    if (createForm.title > 0) {
      this.createTask();
    } else {
      this.failTaskCreate();
    }
  }
  createTask() {
    this.props.dispatch(AddTodoAction(this.props.createForm));
    this.props.dispatch(ClearCreateFormAction());
    this.props.dispatch(ShowAlertAction({ status: 'success', message: 'Task Successfully Created' }));
  }
  failTaskCreate() {
    this.props.dispatch(ShowAlertAction({ status: 'danger', message: 'Task Title is Required' }));
  }
  render() {
    const { tasks, createForm, alert, dispatch } = this.props;

    const taskList = tasks.map((task, index) => (
      <TaskListComponent
        task={task}
        key={task.id}
        deleteTask={(id) => dispatch(DeleteTodoAction({ id }))}
        toggleComplete={(id) => dispatch(ToggleTodoCompleteAction({ id }))}
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
                handleSubmitForm={() => this.validateTask()}
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
