import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import Movie from '../component/Movie';
import bgpng from '../images/bg.png';
import store from '../store/MovieStore';


const MoviePage = () => {

  useEffect(() => {
    store.getMovies(0);
  }, [store]);

  const renderMovie = () => {
    const movies = store.movieList.map(movie => {
      return <Movie
        key={movie.id}
        id={movie.id}
        title={movie.title}
        poster={movie.poster_path}
        bg={movie.backdrop_path}
        vote_average={movie.vote_average}
        store={store}
      />
    })
    return movies;
 };

  const posterUrl = 'https://image.tmdb.org/t/p/original';
  const bgStyle = {
        backgroundImage: 'url('+bgpng+'), url(' + posterUrl + store.movieBg + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        opacity: '.5'
        };

    return useObserver(() => (
      <>
      <div className={store.isMovieSelected ? 'Movie__Section on' : 'Movie__Section'}>
        <h3>{store.sortMethodName}</h3>
        <div className="Movie__Wrapper">
          { store.isMovieLoded ? renderMovie() : <div className="Loading"></div> }
          { store.isSuccessSearch ? null : <div className="Search__Failed"><strong>{store.searchWordFix}</strong> 로 검색한 결과가 없습니다.</div>}
        </div>
      </div>
      </>
    ));
  //}
}

export default MoviePage;