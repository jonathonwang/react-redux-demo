import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

// Component Imports
import AlertComponent from '../components/alert.component';
import NavbarComponent from '../components/navbar.component';

// Async Action Imports
import { FetchTasks } from '../api/task.api';

// App Component Props
interface IAppComponentProps {
  dispatch: Dispatch<Object>;
}

// App Component State
interface IAppComponentState {
  dispatch: Dispatch<Object>;
  componentDidMount(): void;
  render(): JSX.Element;
}

export class AppComponent extends React.Component<IAppComponentProps, IAppComponentState> {
  private componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(FetchTasks());
  }
  render(): JSX.Element {
    const { children, dispatch } = this.props;
    return (
      <div className='container-fluid mt50'>
        <NavbarComponent/>
        {children}
        <AlertComponent/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const App = connect(mapStateToProps)(AppComponent);

export default App;
