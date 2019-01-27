import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ManageProduk from './components/ManageProduk';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ManageProduk />
      </div>
    );
  }
}

export default App;
