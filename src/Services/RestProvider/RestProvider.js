import React from '../../../node_modules/react/index';
import axios from 'axios'


let urlApi = 'http://localhost:8000/';


class RestProvider extends React.Component {
  static WEIGHT_CHANGE = '1';
  static WEIGHT_MOVE_UP = 'up';
  static WEIGHT_MOVE_DOWN = 'down';
  static STAGE_CHANGE = '2';

  static addTicket(ticket={}, idColumn) {
    let url = urlApi + 'api/v1/stages/' + idColumn + '/cards/add';
    let data = JSON.stringify({
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

  static updateTicket(ticket, idColumn) {
    let url = urlApi + 'api/v1/stages/' + idColumn + '/cards/' + ticket.idTicket + '/update';
    let data = JSON.stringify(ticket)

    axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return []
      })
      .catch(error => {
        console.log(error.response);
        return []
      })
  }

  static updateTicketPosition(idTicket, actionType, action, idColumn = null) {
    let url = urlApi + 'api/v1/stages/' + idColumn + '/cards/' + idTicket + '/update/position';
    let data = JSON.stringify({
      actionType: actionType,
      action: action,
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

  static deleteTicket(ticket, idColumn) {
    let url = urlApi + 'api/v1/stages/' + idColumn + '/cards/' + ticket.idTicket + '/delete';
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
    let url = urlApi + 'api/v1/stages/' + id + '/cards';
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
      .catch(error => {
        console.log(error.response);
        return [];
      })
  }

  static getColumns() {
    let url = urlApi + 'api/v1/stages';
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

  static addColumn($title) {
    let idBoard = 1;
    let url = urlApi + 'api/v1/stages/add';
    let data = JSON.stringify({
      idBoard: idBoard,
      title: $title
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
      .catch(error => {
        console.log(error.response);
        return [];
      })
  }

  ping() {
    let url = urlApi + 'api/v1/status';

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