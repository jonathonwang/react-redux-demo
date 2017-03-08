import * as React from 'react';

export class EmptyListComponent extends React.Component<void, void> {
  render(): JSX.Element {
    return (
      <li className='list-group-item text-center'>
        <h5>
          Start By Creating Some Tasks!
        </h5>
      </li>
    );
  }
};

export default EmptyListComponent;
