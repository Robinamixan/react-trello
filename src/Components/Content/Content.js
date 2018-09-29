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
              <Column number="1" title="First Column"/>
            </div>
            <div className="col-md-3">
              <Column number="2" title="Second Column"/>
            </div>
            <div className="col-md-3">
              <Column number="3" title="Third Column"/>
            </div>
            <div className="col-md-3">
              <Column number="4" title="Fourth Column"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;