import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ICreateFormState } from '../reducers/create-form.reducer';

interface IAlertComponentProps {
  createForm: ICreateFormState;
  handleInputUpdate(value: string);
  handleSubmitForm();
}

interface IAlertComponentState {
  handleSubmitForm(event: any): void;
}

export class CreateFormComponent extends React.Component<IAlertComponentProps, IAlertComponentState> {
  submitCreateForm(event: any): void {
    const { handleSubmitForm } = this.props;
    event.preventDefault();
    handleSubmitForm();
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
