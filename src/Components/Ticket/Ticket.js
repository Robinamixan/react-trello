import React, { Component } from 'react';
import './Tickets.css';

class Ticket extends Component {
  render() {
    return (
      <div
        className='ticket'
        draggable="true"
        onDragStart={this.drag}
        id={this.props.id}
        key={this.props.id}
      >
        {this.props.text}
      </div>
    );
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}

export default Ticket;