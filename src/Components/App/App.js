import React, { Component } from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
