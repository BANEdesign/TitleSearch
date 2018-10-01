import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListsContainer from './components/ListsContainer';

const http = require('http');
const port=process.env.PORT || 3000

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Title Search!</h1>
        </header>
        <ListsContainer />
      </div>
    );
  }
}

export default App;
