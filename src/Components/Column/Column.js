import React, { Component } from 'react';
import Ticket from '../Ticket/Ticket';
import './Column.css';
import RestProvider from '../../Services/RestProvider/RestProvider';

let rest = new RestProvider();


class Column extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    rest.getColumnTickets(this.props.number)
      .then((tickets) => {
        this.setState({
          isLoaded: true,
          items: tickets
        });
      });
  }


  render() {
    const { error, isLoaded, items } = this.state;
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
            className={'column-box column-box-' + this.props.number}
            id={'column-box-' + this.props.number}
            onDrop={this.drop}
            onDragOver={this.allowDrop}
          >
            {items.map(item => (
              <Ticket
                id={item.id}
                key={item.id}
                text={item.content}
              />
            ))}

          </div>
        </div>
      );
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(event) {
    event.preventDefault();

    let data = JSON.parse(event.dataTransfer.getData('text'));
    let columnId = '';

    let target = event.target;
    let parent = null;

    if (target.classList.contains('column-box')) {
      parent = target;
      parent.appendChild(document.getElementById(data.domId));
      columnId = parent.id.replace('column-box-', '');
    } else {
      parent = target.closest(".ticket");
      parent.insertAdjacentElement("afterend", document.getElementById(data.domId));
      columnId = target.closest(".column-box").id.replace('column-box-', '');
    }

    let ticket = {
      id: data.id,
      idColumn: columnId,
      content: data.content
    }

    rest.updateTicket(ticket)
  }
}

export default Column;