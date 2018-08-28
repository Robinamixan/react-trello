import React, { Component } from 'react';
import './Header.css';
import RestProvider from '../../Services/RestProvider/RestProvider';

let rest = new RestProvider();

class Header extends Component {
  render() {
    return (
      <div className="header">
        <header className="title-box">
          <h1 className="title">Welcome to board</h1>
          <div className="container">
            <div className="row">
              <div className="col-md-8 left-header">
                Left!
              </div>

              <div className="col-md-4 right-header">
                <button onClick={this.newTicket}>New!</button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  newTicket() {
    rest.addTicket();
  }
}

export default Header;