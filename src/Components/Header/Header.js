import React, { Component } from 'react';
import './Header.css';

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
                Right!
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;