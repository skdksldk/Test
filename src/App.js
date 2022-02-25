import React, { Component } from 'react';
import MoviePage from './pages/MoviePage';
import Header from './component/Header';
import './App.css';

class App extends Component {
  render() {
      return ( 
        <div className = "App" >
          <Header />
          <MoviePage / > 
        </div>
      );
  }
}

export default App;
