import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

// Component Imports
import AlertComponent from '../components/alert.component';
import NavbarComponent from '../components/navbar.component';

// Interface Imports
import { IAlertState } from '../reducers/alert.reducer';

// Async Action Imports
import { FetchTasks } from '../async-actions/task.async-actions';
import { HideAlert } from '../actions/alert.actions';

// App Component Props
interface IAppComponentProps {
  dispatch: Dispatch<Object>;
  alert: IAlertState;
}

export class AppComponent extends React.Component<IAppComponentProps, void> {
  private componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(FetchTasks());
  }
  render(): JSX.Element {
    const { alert, children, dispatch } = this.props;
    return (
      <div className='root-container container-fluid'>
        <NavbarComponent/>
        {children}
        <AlertComponent alert={alert} hideAlert={() => dispatch(HideAlert())}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.alert
});

const App = connect(mapStateToProps)(AppComponent);

export default App;
