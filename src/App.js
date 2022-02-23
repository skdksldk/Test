import React, { Component } from 'react';
import MoviePage from './pages/MoviePage';
import './App.css';

class App extends Component {
  render() {
      return ( 
        <div className = "App" >
          <MoviePage / > 
        </div>
      );
  }
}

export default App;
