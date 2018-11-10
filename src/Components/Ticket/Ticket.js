import React, { Component } from 'react';
import './Tickets.css';
import EditForm from '../../Forms/TicketEditForm/TicketEditForm'
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

    this.state = {
      title: this.props.title,
      text: this.props.text,
      id: this.props.id,
    }
  }

  changeText = (newText, newTitle) => {
    this.setState({
      text: newText,
      title: newTitle,
    });

    let ticket = {
      idTicket: this.state.id,
      title: newTitle,
      content: newText,
    }

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
          <span>{this.state.title}</span>

          <button onClick={() => this.props.onShowPopup(
            <EditForm
              onChangeEvent={this.changeText}
              onClosePopup={this.props.onClosePopup}
              currentTextValue={this.state.text}
              currentTitleValue={this.state.title}
            />
          )}>Edit</button>
        </div>
        <div className={'main-content'}>
          {this.state.text}
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