import * as React from 'react';

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
  setAlertClasses(): string {
    const { alert } = this.props;
    let alertClasses = ['alert', 'alert-dismissable'];
    alertClasses.push(`alert-${alert.status}`);
    if (alert.visible) alertClasses.push('alert--visible');
    return alertClasses.join(' ');
  }
  render() {
    const { alert } = this.props;
    return (
      <div className={this.setAlertClasses()}>
        <a href='#' className='close' aria-label='close' onClick={(event) => this.closeAlert(event)}>&times;</a>
        <strong className='text-capitalize'>{alert.status}!</strong> <span className='text-capitalize'>{alert.message}.</span>
      </div>
    );
  }
}

export default AlertComponent;
