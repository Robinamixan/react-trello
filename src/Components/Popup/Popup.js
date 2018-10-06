import React, { Component } from 'react';
import './Popup.css';

class Popup extends Component {
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    const popupBlock = document.getElementById('popup-contain');
    // Check if there is component in parents or children
    if (!e.path.includes(popupBlock)) {
      this.props.onClosePopup(null);
    }
  }

  render() {
    return (
      <div id={'popup-main'}>
        <div id={'popup-contain'}>
          <button onClick={() => this.props.onClosePopup(null)}>Close</button>
          POPUP
        </div>
      </div>
    );
  }
}

export default Popup;
