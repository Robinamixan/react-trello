import React, { Component } from 'react';
import Ticket from '../Ticket/Ticket';
import './Column.css';
import RestProvider from '../../Services/RestProvider/RestProvider';
import TicketForm from '../../Forms/TicketForm/TicketForm';


class Column extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      isLoaded: false,
      items: [],
      id: this.props.idColumn,
    }

    this.props.setStage(this)
  }

  componentDidMount() {
    this.getTickets();
  }

  getTickets() {
    RestProvider.getColumnTickets(this.state.id)
      .then((tickets) => {
        this.setState({
          isLoaded: true,
          items: tickets
        });
      });
  }

  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='column'>
          <div className='column-title'>
            {this.props.title}
          </div>
          <div
            className={'column-box column-box-' + this.state.id}
            id={'column-box-' + this.state.id}
            onDrop={this.drop}
            onDragOver={this.allowDrop}
          >
            {items.map(item => (
              <Ticket
                id={item.id}
                key={item.id}
                title={item.title}
                text={item.content}
                column={this}
                selected={this.props.selected}
                setSelected={this.props.setSelected}
                onShowPopup={this.props.onShowPopup}
                onClosePopup={this.props.onClosePopup}
                deleteTicket={this.deleteTicket}
              />
            ))}
          </div>
          <div
            className={'column-footer column-footer-' + this.state.id}
            id={'column-box-' + this.state.id}
          >
            <button onClick={() => this.props.onShowPopup(
              <TicketForm
                onSubmitEvent={this.createTicket}
                onClosePopup={this.props.onClosePopup}
                textValue=''
                titleValue=''
                idColumn={this.state.id}
                buttonText='Save'
              />
            )}>Add ticket</button>
          </div>
        </div>
      );
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop = (event) => {
    event.preventDefault();
    let data = JSON.parse(event.dataTransfer.getData('data'));

    let ticketId = data.id;
    let oldStageId = data.stageId;
    let newStageId = this.props.idColumn;

    if (oldStageId !== newStageId) {
      this.props.setMoveDuplicate(data.id, newStageId);

      this.props.updateTicketColumn(ticketId, newStageId, oldStageId);
    }
  }

  createTicket = (title, content) => {
    let ticket = {
      title: title,
      content: content,
    }

    RestProvider.addTicket(ticket, this.state.id)
      .then(() => {
        this.setState({
          isLoaded: false,
        });

        RestProvider.getColumnTickets(this.state.id)
          .then((tickets) => {
            this.setState({
              isLoaded: true,
              items: tickets
            });
          });
      });
  }

  deleteTicket = (idTicket) => {
    let ticket = {
      idTicket: idTicket,
    }

    RestProvider.deleteTicket(ticket, this.state.id)
      .then(() => {
        this.setState({
          isLoaded: false,
        });

        RestProvider.getColumnTickets(this.state.id)
          .then((tickets) => {
            this.setState({
              isLoaded: true,
              items: tickets
            });
          });
      });
  }
}

export default Column;