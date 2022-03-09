import React from 'react';
import { useObserver, Observer } from 'mobx-react-lite';
import store from '../store/MovieStore';

const Movie = (props) => {

  const handleMouseEnter = () => {
    const changeBg = props.bg;
    store.changeMovieBg(changeBg);
  };
  
  const handleMovieSelect = () => {

    const selectedMovieId = props.id;
    store.movieSelectToggle();
    store.getDetailMovie(selectedMovieId);

    var DetailBox = document.querySelector('.Detail__Info');
    DetailBox.scrollTo(0, 0);
  };

  const handleBgRestore = () => {
    store.setBgRestore();
  };

  const posterUrl = 'https://image.tmdb.org/t/p/original';
  return useObserver(() => (
    <div className="Movie__Box"  onMouseOver={handleMouseEnter} onClick={handleMovieSelect} onMouseLeave={store.isMovieSelected ? handleBgRestore() : null}>
      <div className="Poster__Wrap"><img src={posterUrl + props.poster} alt={props.title} /></div>
      <div className="Movie__Info">
        <h4>{props.title}</h4>
        <p><i className="fas fa-star"></i>{props.vote_average}</p>
      </div>
    </div>
  ));
};

export default Movie;