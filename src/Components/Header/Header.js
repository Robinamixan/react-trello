import React, { Component } from 'react';
import './Header.css';
import RestProvider from '../../Services/RestProvider/RestProvider';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <header className="title-box">
          <h1 className="title">Welcome to board</h1>
          <div className="container">
            <div className="row">
              <div className="col-md-8 left-header">
                <button onClick={this.newColumn}>New Column</button>
                <button onClick={this.refresh}>Refresh Board</button>
              </div>

              <div className="col-md-4 right-header">
                <button onClick={() => this.props.onShowPopup('test')}>SHOW POPUP</button>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  newColumn() {
    RestProvider.addColumn();
  }

  refresh = () => {
    this.props.onRefreshBoard();
  }
}

export default Header;