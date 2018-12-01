import React, { Component } from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Popup from '../Popup/Popup';
import './App.css';

class App extends Component {
  state = {
    showPopup: false,
    boardKey: 1,
    popupForm: null
  }

  refreshBoard = () => {
    this.setState({
      boardKey: this.state.boardKey + 1
    });
  }

  showPopup = (form) => {
    this.setState({
      showPopup: true,
      popupForm: form
    });
  }

  closePopup = () => {
    this.setState({
      showPopup: false,
    });
  }

  render() {
    return (
      <div>
        { this.state.showPopup &&
          <Popup
            onClosePopup={this.closePopup}
            popupForm={this.state.popupForm}
          />
        }

        <Header
          onShowPopup={this.showPopup}
          onRefreshBoard={this.refreshBoard}
        />

        { this.state.boardKey &&
          <Content
            onShowPopup={this.showPopup}
            onClosePopup={this.closePopup}
            state={this.state.boardKey}
          />
        }

      </div>
    );
  }
}

export default App;
