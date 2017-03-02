import * as React from 'react';

export class NotFoundComponent extends React.Component<void, void> {
  render(): JSX.Element {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h1>Page Not Found.</h1>
        </div>
      </div>
    );
  }
}

export default NotFoundComponent;
