import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AddTodoAction, DeleteTodoAction } from '../actions/task.actions';

interface AppComponentProps {
  tasks: Array<string>;
  dispatch: Dispatch<Object>;
}

export class AppComponent extends React.Component<any, any> {
  // constructor() {}
  render() {
    const { tasks, dispatch } = this.props;
    const tasksList = tasks.map((task, index) => (
      <span key={index}>{task}</span>)
    );
    return (
      <div className='test'>
        {tasksList}
        <br/>
        <button className='btn btn-default' onClick={() => dispatch(AddTodoAction())}>Add Todo</button>
        <button className='btn btn-default' onClick={() => dispatch(DeleteTodoAction())}>Delete Todo</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ tasks: state.tasks });

const App = connect(mapStateToProps)(AppComponent);

export default App;
