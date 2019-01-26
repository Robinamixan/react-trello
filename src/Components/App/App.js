import React, { Component } from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Popup from '../Popup/Popup';
import './App.css';

class App extends Component {
  state = {
    showPopup: false,
    popupForm: null
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
        />

        <Content
          onShowPopup={this.showPopup}
          onClosePopup={this.closePopup}
        />
      </div>
    );
  }
}

export default App;
