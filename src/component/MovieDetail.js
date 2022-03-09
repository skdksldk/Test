import React from 'react';
import { useObserver } from 'mobx-react-lite';
import store from '../store/MovieStore';

const MovieDetail = (props) => {

  const posterUrl = 'https://image.tmdb.org/t/p/original';

  return useObserver(() => (
    <>
      <div className="Poster__Wrap Detail__Poster">
        <img src={posterUrl + props.poster} alt={props.title}/>
      </div>
      <div className="Text__Info">
        <h2>{props.title}</h2>
        <h3>{props.og_title}</h3>
        <p>
          <span className="Vote__Average"><i className="fas fa-star"></i>{props.vote_average}</span>
          <span className="Running__Time"><i className="far fa-clock"></i> {props.runtime}분</span>
        </p>

        <p className="Tagline">{props.tagline}</p>
        <p className="Summary">{props.summary}</p>

      </div>
    </>
  ));
}

function Genre ({genre}) {
  return (
    <span className="Movie__Genre">{genre}</span>
  )
}

export default MovieDetail;