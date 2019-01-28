import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeBertasbih from './components/HomeBertasbih';
import MovieList from './components/MovieList';
import CategoryList from './components/CategoryList';
import ConnectionList from './components/ConnectionList';
// import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { withRouter} from 'react-router-dom';


class App extends Component {
  state = { content: 'Ini Home Page'}
  render() {
    return (
      <div className="App">
        {/* <HomeBertasbih /> */}
        <MovieList />
        {/* <CategoryList />
        <ConnectionList /> */}
      </div>
    );
  }
}

export default App;
