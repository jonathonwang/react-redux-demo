import * as React from 'react';
import classNames from 'classnames';

interface IAlertComponentProps {
  status: string;
  message: string;
  visible: boolean;
}

export class AlertComponent extends React.Component<any, any> {
  closeAlert(event: any): void {
    event.preventDefault();
    this.props.closeAlert();
  }
  render() {
    const { alert } = this.props;
    return (
      <div className={classNames('alert', 'alert-dismissable', `alert-${alert.status}`, { 'alert--visible': alert.visible })}>
        <a href='#' className='close' aria-label='close' onClick={(event) => this.closeAlert(event)}>&times;</a>
        <strong className='text-capitalize'>{alert.status}!</strong> <span className='text-capitalize'>{alert.message}.</span>
      </div>
    );
  }
}

export default AlertComponent;
