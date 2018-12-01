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
      this.props.onClosePopup();
    }
  }

  render() {
    return (
      <div id={'popup-main'}>
        <div id={'popup-contain'}>
          <div className={'popup-header'}>
            <button
              className={'btn btn-default icon-close'}
              onClick={() => this.props.onClosePopup()}
            ></button>
          </div>
          <div className={'popup-container'}>
            {this.props.popupForm}
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
