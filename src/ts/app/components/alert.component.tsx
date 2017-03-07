import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import classNames from 'classnames';

import { HideAlert } from '../actions/alert.actions';

import { IAlertState } from '../reducers/alert.reducer';

interface IAlertComponentProps {
  alert: IAlertState;
  hideAlert();
}

export class AlertComponent extends React.Component<IAlertComponentProps, void> {
  private closeAlert(event: any): void {
    event.preventDefault();
    this.props.hideAlert();
  }
  render(): JSX.Element {
    const { alert } = this.props;
    const alertClasses: string = classNames('alert', 'alert-dismissable', `alert-${alert.status}`, { 'alert--visible': alert.visible });
    return (
      <div className={alertClasses}>
        <a href='#' className='close' aria-label='close' onClick={(event) => this.closeAlert(event)}>&times;</a>
        <strong  id='alert-status' className='text-capitalize'>{alert.status}!</strong> <span id='alert-message' className='text-capitalize'>{alert.message}.</span>
      </div>
    );
  }
}

export default AlertComponent;
