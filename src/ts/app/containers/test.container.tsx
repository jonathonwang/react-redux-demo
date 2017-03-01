import * as React from 'react';
import { connect } from 'react-redux';

export class TestComponent extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <div>
        Test
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tasks: state.tasks,
  createForm: state.createForm,
  alert: state.alert
});

const Test = connect(mapStateToProps)(TestComponent);

export default Test;
