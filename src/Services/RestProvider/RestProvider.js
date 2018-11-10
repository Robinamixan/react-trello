import React from '../../../node_modules/react/index';
import axios from 'axios'


let urlApi = 'http://react-rest.loc/'


class RestProvider extends React.Component {
  constructor(){
    super();

    this.url_api = 'http://react-rest.loc/';
  }

  addTicket() {
    let idColumn = 2;
    let url = this.url_api + 'rest/api/cards/add';
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
        if (res.status !== 200) {
          console.log(res);
        }
      })
  }

  static updateTicket(ticket) {
    let url = urlApi + 'rest/api/cards/update';
    let data = JSON.stringify(ticket)

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status !== 200) {
          console.log(res);
        }
      })
  }

  static getColumnTickets(id) {
    let url = urlApi + 'rest/api/column/' + id + '/cards';
    let tickets = [];

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        tickets = res.data;
        if( typeof tickets.error !== 'undefined' ){
          console.log(res);
          return [];
        } else {
          return tickets;
        }
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
        console.log(res);
      })
  }
}

export default RestProvider;