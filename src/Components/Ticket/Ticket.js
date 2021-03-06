import React, { Component } from 'react';
import './Tickets.css';
import TicketForm from '../../Forms/TicketForm/TicketForm';
import RestProvider from '../../Services/RestProvider/RestProvider';

class Ticket extends Component {
  states = {
    title: '',
    text: '',
    id: '',
    column: '',
    selected: false,
  }

  constructor(props) {
    super(props)

    let visibleText = this.props.text;
    let selected = false;
    this.selectTicket = this.selectTicket.bind(this);

    if (visibleText.length > 100) {
      visibleText = visibleText.substring(0, 100) + '...';
    }

    if (this.props.selected) {
      if (this.props.selected.state.id === this.props.id) {
        selected = true;
        this.props.setSelected(this);
      }
    }

    this.state = {
      title: this.props.title,
      text: this.props.text,
      visibleText: visibleText,
      id: this.props.id,
      selected: selected,
      column: this.props.column,
    }
  }

  getClasses() {
    let classNames = 'ticket';

    if (this.state.selected) {
      classNames += ' selected';
    }

    return classNames;
  }

  render() {
    let ticketClasses = this.getClasses();
    return (
      <div
        className={ticketClasses}
        draggable="true"
        onDragStart={this.drag}
        id={'ticket-' + this.state.id}
        key={'ticket-' + this.state.id}
        onClick={this.selectTicket}
      >
        <div className={'manage-panel'}>
          <span className={'ticket-title'}>{this.state.title}</span>

          <button
            className={'edit-button icon-edit'}
            onClick={() => this.props.onShowPopup(
            <TicketForm
              onSaveEvent={this.changeText}
              onDeleteEvent={this.props.deleteTicket}
              onClosePopup={this.props.onClosePopup}
              idValue={this.state.id}
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

  drag = (event) => {
    let data = {
      id: event.target.id.replace('ticket-', ''),
      content: document.getElementById(event.target.id).innerHTML,
      stageId: this.state.column.state.id,
    };

    event.dataTransfer.setData('data', JSON.stringify(data));
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
    };

    RestProvider.updateTicket(ticket);
  }

  selectTicket(event) {
    this.setState({
      selected: !this.state.selected,
    });

    this.props.setSelected(this);
  }

  unselectTicket() {
    this.setState({
      selected: false,
    });
  }
}

export default Ticket;