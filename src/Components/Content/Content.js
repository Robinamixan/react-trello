import React, { Component } from 'react';
import Column from '../Column/Column';
import './Content.css';

class Content extends Component {
  render() {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Column
                idColumn="1"
                title="First Column"
                onShowPopup={this.props.onShowPopup}
                onClosePopup={this.props.onClosePopup}
              />
            </div>
            <div className="col-md-3">
              <Column
                idColumn="2"
                title="Second Column"
                onShowPopup={this.props.onShowPopup}
                onClosePopup={this.props.onClosePopup}
              />
            </div>
            <div className="col-md-3">
              <Column
                idColumn="3"
                title="Third Column"
                onShowPopup={this.props.onShowPopup}
                onClosePopup={this.props.onClosePopup}
              />
            </div>
            <div className="col-md-3">
              <Column
                idColumn="4"
                title="Fourth Column"
                onShowPopup={this.props.onShowPopup}
                onClosePopup={this.props.onClosePopup}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;