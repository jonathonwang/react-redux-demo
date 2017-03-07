import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

// Component Imports
import AlertComponent from '../components/alert.component';
import NavbarComponent from '../components/navbar.component';

// Interface Imports
import { IAlertState } from '../reducers/alert.reducer';
import { INavbarState } from '../reducers/navbar.reducer';

// Async Action Imports
import { FetchTasks } from '../async-actions/task.async-actions';

// Sync Action Imports
import { ToggleNavbar } from '../actions/navbar.actions';
import { HideAlert } from '../actions/alert.actions';

// App Component Props
interface IAppComponentProps {
  dispatch: Dispatch<Object>;
  alert: IAlertState;
  navbar: INavbarState;
}

export class AppComponent extends React.Component<IAppComponentProps, void> {
  private componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(FetchTasks());
  }
  render(): JSX.Element {
    const { navbar, alert, children, dispatch } = this.props;
    return (
      <div className='root-container container-fluid'>
        <NavbarComponent navbar={navbar} toggleNavbar={() => dispatch(ToggleNavbar())}/>
        {children}
        <AlertComponent alert={alert} hideAlert={() => dispatch(HideAlert())}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.alert,
  navbar: state.navbar
});

const App = connect(mapStateToProps)(AppComponent);

export default App;
