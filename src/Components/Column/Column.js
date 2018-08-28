import React, { Component } from 'react';
import Ticket from '../Ticket/Ticket';
import './Column.css';


class Column extends Component {
  render() {
    return (
      <div className='column'>
        <div className='column-title'>
          {this.props.title}
        </div>
        <div
          className={'column-box column-box-' + this.props.number}
          id={'column-box-' + this.props.number}
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >

          {this.createTickets()}
        </div>
      </div>
    );
  }

  createTickets() {
    let column = [];

    for (let i = 0; i < this.props.tickets; i++) {
      column.push(
        <Ticket
          id={'ticket-' + this.props.number + '-' + i}
          key={'ticket-' + this.props.number + '-' + i}
          text={this.props.number + '-' + i}
        />
      )
    }
    return column;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let target = ev.target;
    let parent = null;
    if (target.classList.contains('column-box')) {
      parent = target;
      parent.appendChild(document.getElementById(data));
    } else {
      parent = target.closest(".ticket");
      parent.insertAdjacentElement("afterend", document.getElementById(data));
    }

  }
}

export default Column;