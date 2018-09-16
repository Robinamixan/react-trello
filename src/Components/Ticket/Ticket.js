import React, { Component } from 'react';
import './Tickets.css';

class Ticket extends Component {
  render() {
    return (
      <div
        className='ticket'
        draggable="true"
        onDragStart={this.drag}
        id={'ticket-' + this.props.id}
        key={'ticket-' + this.props.id}
      >
        {this.props.text}
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