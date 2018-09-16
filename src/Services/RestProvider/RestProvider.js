import React from '../../../node_modules/react/index';
import axios from 'axios'


class RestProvider extends React.Component {
  constructor(){
    super();

    this.url_api = 'http://react-rest.loc/';
  }

  addTicket() {
    let idColumn = 2;
    let url = this.url_api + '/rest/api/cards/add';
    let data = JSON.stringify({
      idColumn: idColumn,
      content: 'api-3'
    })

    axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        const data = res.data;
        console.log(res);
      })
  }

  updateTicket(ticket) {
    let url = this.url_api + '/rest/api/cards/update';
    let data = JSON.stringify({
      idTicket: ticket.id,
      idColumn: ticket.idColumn,
      content: ticket.content
    })

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        const data = res.data;
        console.log(res);
      })
  }

  getTickets() {
    let url = this.url_api + '/rest/api/cards/get';
    let tickets = [];

    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        tickets = res.data;
        console.log(res);
        return tickets;
      })
  }

  getColumnTickets(id) {
    let url = this.url_api + 'rest/api/cards/get/column/' + id;
    let tickets = [];

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        tickets = res.data;
        return tickets;
      })
  }

  ping() {
    let url = this.url_api + 'ping';

    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        const persons = res.data;
        console.log(res);
      })
  }
}

export default RestProvider;