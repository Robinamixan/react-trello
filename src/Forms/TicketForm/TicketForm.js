import React, { Component } from 'react';
import './TicketForm.css';
import * as ReactDOM from 'react-dom'

class TicketForm extends Component {
  onSaveClickHandler() {
    let title = ReactDOM.findDOMNode(this.refs.ticketTitleInput).value;
    let text = ReactDOM.findDOMNode(this.refs.ticketTextInput).value;

    this.props.onSaveEvent(title, text);
    this.props.onClosePopup()
  }

  onDeleteClickHandler() {
    let id = this.props.idValue;

    this.props.onDeleteEvent(id);
    this.props.onClosePopup()
  }

  render() {
    return (
      <div className={'form ticket-edit-form'}>
        <div className='edit-title-input-container'>
          <input
            className='content-input form-element'
            defaultValue={this.props.titleValue}
            placeholder='Title'
            ref='ticketTitleInput'
          />
        </div>
        <div className='edit-text-input-container'>
          <textarea
            rows="10"
            cols="45"
            name="text"
            className='content-input form-element'
            placeholder='Content'
            ref='ticketTextInput'
            defaultValue={this.props.textValue}
          >
        </textarea>
        </div>
        <button
          className={'form-element form-submit btn btn-default'}
          onClick={this.onSaveClickHandler.bind(this)}
          ref='save_button'
        >
          {this.props.buttonText}
        </button>

        {this.props.onDeleteEvent && <button
          className={'form-element form-submit btn btn-default'}
          onClick={this.onDeleteClickHandler.bind(this)}
          ref='delete_button'
        >
          Delete
        </button>}
      </div>
    );
  }
}

export default TicketForm;