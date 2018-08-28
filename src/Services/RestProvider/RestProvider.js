import React from '../../../node_modules/react/index';
import axios from 'axios'


class RestProvider extends React.Component {
  constructor(){
    super();

    this.url_api = 'http://react-rest.loc/';
  }

  addTicket(){
    let idColumn = 5;
    let url = this.url_api + 'api/ticket/add/' + idColumn;
    let data = JSON.stringify({
      title: '2',
      content: '3'
    })

    axios.post(url, data, {
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