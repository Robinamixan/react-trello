import React, { Component } from 'react';
import Ticket from '../Ticket/Ticket';
import './Column.css';
import RestProvider from '../../Services/RestProvider/RestProvider';


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
    RestProvider.getColumnTickets(this.props.idColumn)
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
            className={'column-box column-box-' + this.props.idColumn}
            id={'column-box-' + this.props.idColumn}
            onDrop={this.drop}
            onDragOver={this.allowDrop}
          >
            {items.map(item => (
              <Ticket
                id={item.id}
                key={item.id}
                title={item.title}
                text={item.content}
                onShowPopup={this.props.onShowPopup}
                onClosePopup={this.props.onClosePopup}
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

  drop = (event) => {
    event.preventDefault();

    let data = JSON.parse(event.dataTransfer.getData('text'));
    let target = event.target;
    let parent = null;

    if (target.classList.contains('column-box')) {
      parent = target;
      parent.appendChild(document.getElementById(data.domId));
    } else {
      parent = target.closest(".ticket");
      parent.insertAdjacentElement("afterend", document.getElementById(data.domId));
    }

    let ticket = {
      idTicket: data.id,
      idColumn: this.props.idColumn,
    }

    RestProvider.updateTicket(ticket)
  }
}

export default Column;