import React from 'react';
import { useObserver } from 'mobx-react-lite';
import store from '../store/MovieStore';

const Movie = (props) => {

  const handleMouseEnter = () => {
    const changeBg = props.bg;
    store.changeMovieBg(changeBg);
  };

  const posterUrl = 'https://image.tmdb.org/t/p/original';
  return useObserver(() => (
    <div className="Movie__Box">
      <div className="Poster__Wrap"><img src={posterUrl + props.poster} alt={props.title} /></div>
      <div className="Movie__Info">
        <h4>{props.title}</h4>
        <p><i className="fas fa-star"></i>{props.vote_average}</p>
      </div>
    </div>
  ));
};

export default Movie;