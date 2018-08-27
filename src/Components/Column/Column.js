import React, { Component } from 'react';
import './Column.css';


//TODO: Split to Tickets component
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
        <div
          className='ticket'
          draggable="true"
          onDragStart={this.drag}
          id={'ticket-' + this.props.number + '-' + i}
          key={'ticket-' + this.props.number + '-' + i}
        >
          {this.props.number + '-' + i}
        </div>
      )
    }
    return column;
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
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