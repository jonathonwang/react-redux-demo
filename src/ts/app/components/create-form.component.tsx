import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export class CreateFormComponent extends React.Component<any, any> {
  submitCreateForm(event: any): void {
    event.preventDefault();
    this.props.handleSubmitForm();
  }
  render() {
    const { createForm, handleInputUpdate, handleSubmitForm } = this.props;
    return (
      <li className='list-group-item'>
        <form onSubmit={(event: any) => this.submitCreateForm(event)}>
          <div className='form--group'>
            <input type='text' name='title' className='form-control' autoComplete='off'
              value={createForm.title}
              onChange={(event: any) => handleInputUpdate(event.target.value)}
            />
          </div>
        </form>
      </li>
    );
  }
}

export default CreateFormComponent;
