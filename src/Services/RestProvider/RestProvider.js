import React from '../../../node_modules/react/index';
import axios from 'axios'


let urlApi = 'http://localhost:8000/';


class RestProvider extends React.Component {
  static WEIGHT_CHANGE = '1';
  static WEIGHT_MOVE_UP = 'up';
  static WEIGHT_MOVE_DOWN = 'down';
  static STAGE_CHANGE = '2';

  constructor(){
    super();

    this.url_api = 'http://react-rest.loc/';
  }

  static addTicket(ticket={}, idColumn=1) {
    let url = urlApi + 'rest/api/cards/add';
    let data = JSON.stringify({
      idColumn: idColumn,
      title: ticket.title,
      content: ticket.content,
    })

    return axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return [];
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
      })
  }

  static updateTicketPosition(idTicket, actionType, action, idColumn = null) {
    let url = urlApi + 'rest/api/cards/update/position';
    let data = JSON.stringify({
      idTicket: idTicket,
      actionType: actionType,
      action: action,
      idColumn: idColumn,
    })

    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status !== 200) {
          return false;
        } else {
          return true;
        }
      })
  }

  static deleteTicket(ticket={}) {
    let url = urlApi + 'rest/api/cards/delete';
    let data = JSON.stringify(ticket)

    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status !== 200) {
        }
        return [];
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
          return [];
        } else {
          return tickets;
        }
      })
  }

  static getColumns() {
    let url = urlApi + 'rest/api/stages';
    let stages = [];

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        stages = res.data;
        if( typeof stages.error !== 'undefined' ){
          return [];
        } else {
          return stages;
        }
      })
  }

  static addColumn() {
    let idBoard = 1;
    let url = urlApi + 'rest/api/stages/add';
    let data = JSON.stringify({
      idBoard: idBoard,
      title: 'New Column'
    })

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        let data = res.data;
        if( typeof data.error !== 'undefined' ){
          return [];
        } else {
          return data;
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