import React, { Component } from 'react';
import './TicketEditForm.css';
import * as ReactDOM from 'react-dom'

class TicketEditForm extends Component {
  onBtnClickHandler() {
    let newText = ReactDOM.findDOMNode(this.refs.ticketTextInput).value;
    console.log(newText);
    this.props.onChangeEvent(newText);
    this.props.onClosePopup()
  }

  render() {
    return (
      <div className={'form ticket-edit-form'}>
        <input
          className='content-input form-element'
          defaultValue=''
          placeholder='new value'
          ref='ticketTextInput'
        />
        <button
          className={'form-element form-submit btn btn-default'}
          onClick={this.onBtnClickHandler.bind(this)}
          ref='save_button'
        >Save</button>
      </div>
    );
  }
}

export default TicketEditForm;