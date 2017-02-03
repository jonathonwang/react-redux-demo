import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AddTodoAction, DeleteTodoAction, ToggleTodoCompleteAction } from '../actions/task.actions';

import { UpdateCreateFieldAction, ClearCreateFormAction } from '../actions/create-form.actions';

// Component Imports
import CreateFormComponent from '../components/create-form.component';
import TaskListComponent from '../components/task-list.component';

interface AppComponentProps {
  tasks: Array<{ title: string; id: number; isComplete: boolean; }>;
  createForm: any;
  dispatch: Dispatch<Object>;
}

export class AppComponent extends React.Component<AppComponentProps, void> {
  createTask() {
    this.props.dispatch(AddTodoAction(this.props.createForm));
    this.props.dispatch(ClearCreateFormAction());
  }
  render() {
    const { tasks, createForm, dispatch } = this.props;

    const taskList = tasks.map((task, index) => (
      <TaskListComponent
        task={task}
        key={task.id}
        deleteTask={(id) => dispatch(DeleteTodoAction({ id }))}
        toggleComplete={(id) => dispatch(ToggleTodoCompleteAction({ id }))}
      />
    ));

    return (
      <div className='container'>
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
                handleSubmitForm={() => this.createTask()}
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
  createForm: state.createForm
});

const App = connect(mapStateToProps)(AppComponent);

export default App;
