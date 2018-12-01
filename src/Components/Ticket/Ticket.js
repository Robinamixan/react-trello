import React, { Component } from 'react';
import './Tickets.css';
import TicketForm from '../../Forms/TicketForm/TicketForm';
import RestProvider from '../../Services/RestProvider/RestProvider';

class Ticket extends Component {
  states = {
    title: '',
    text: '',
    id: '',
    idColumn: ''
  }

  constructor(props) {
    super(props)

    let visibleText = this.props.text;

    if (visibleText.length > 100) {
      visibleText = visibleText.substring(0, 100) + '...'
    }

    this.state = {
      title: this.props.title,
      text: this.props.text,
      visibleText: visibleText,
      id: this.props.id,
    }
  }

  changeText = (newTitle, newText) => {
    this.setState({
      title: newTitle,
      text: newText,
    });

    let ticket = {
      idTicket: this.state.id,
      title: newTitle,
      content: newText,
    }

    console.log(ticket)
    RestProvider.updateTicket(ticket)
  }

  render() {
    return (
      <div
        className='ticket'
        draggable="true"
        onDragStart={this.drag}
        id={'ticket-' + this.state.id}
        key={'ticket-' + this.state.id}
      >
        <div className={'manage-panel'}>
          <span className={'ticket-title'}>{this.state.title}</span>

          <button
            className={'edit-button icon-edit'}
            onClick={() => this.props.onShowPopup(
            <TicketForm
              onSubmitEvent={this.changeText}
              onClosePopup={this.props.onClosePopup}
              titleValue={this.state.title}
              textValue={this.state.text}
              buttonText='Save'
            />
          )}></button>
        </div>
        <div className={'main-content'}>
          {this.state.visibleText}
        </div>
      </div>
    );
  }

  drag(event) {
    let data = {
      id: event.target.id.replace('ticket-', ''),
      domId: event.target.id,
      content: document.getElementById(event.target.id).innerHTML
    };

    event.dataTransfer.setData('text', JSON.stringify(data));
  }
}

export default Ticket;