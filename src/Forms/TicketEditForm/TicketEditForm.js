import React, { Component } from 'react';
import './TicketEditForm.css';
import * as ReactDOM from 'react-dom'

class TicketEditForm extends Component {
  onBtnClickHandler() {
    let newTitle = ReactDOM.findDOMNode(this.refs.ticketTitleInput).value;
    let newText = ReactDOM.findDOMNode(this.refs.ticketTextInput).value;

    this.props.onChangeEvent(newText, newTitle);
    this.props.onClosePopup()
  }

  render() {
    return (
      <div className={'form ticket-edit-form'}>
        <div className='edit-title-input-container'>
          <input
            className='content-input form-element'
            defaultValue={this.props.currentTitleValue}
            placeholder='New title'
            ref='ticketTitleInput'
          />
        </div>
        <div className='edit-text-input-container'>
          <textarea
            rows="10"
            cols="45"
            name="text"
            className='content-input form-element'
            ref='ticketTextInput'
          >
          {this.props.currentTextValue}
        </textarea>
        </div>
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