import * as React from 'react';
import classNames from 'classnames';

import { IAlertState } from '../reducers/alert.reducer';

interface IAlertComponent {
  closeAlert(event: any): void;
  render(): JSX.Element;
}

interface IAlertComponentProps {
  alert: IAlertState;
  closeAlert(): void;
}

interface IAlertComponentState {
  closeAlert(event: any): void;
}

export class AlertComponent extends React.Component<IAlertComponentProps, IAlertComponentState> implements IAlertComponent {
  closeAlert(event: any): void {
    event.preventDefault();
    this.props.closeAlert();
  }
  render(): JSX.Element {
    const { alert } = this.props;
    const alertClasses: string = classNames('alert', 'alert-dismissable', `alert-${alert.status}`, { 'alert--visible': alert.visible });
    return (
      <div className={alertClasses}>
        <a href='#' className='close' aria-label='close' onClick={(event) => this.closeAlert(event)}>&times;</a>
        <strong className='text-capitalize'>{alert.status}!</strong> <span className='text-capitalize'>{alert.message}.</span>
      </div>
    );
  }
}

export default AlertComponent;
