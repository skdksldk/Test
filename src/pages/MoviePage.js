import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import Movie from '../component/Movie';
import bgpng from '../images/bg.png';
import store from '../store/MovieStore';


const MoviePage = () => {

    const posterUrl = 'https://image.tmdb.org/t/p/original';
    let bgStyle = null;

    useEffect(() => {
      store.getMovies(0);
    }, []);

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

    return useObserver((
      bgStyle = {
            backgroundImage: 'url(' + posterUrl + store.movieBg + ')',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: ".5"
          }

    ) => (
      <>
      <div className={store.isMovieSelected ? 'Detail__View on' : 'Detail__View'}>
        <div className="Movie__Bg">
          <div className="Bg" style={bgStyle} />
        </div>
      </div>
      <div className={store.isMovieSelected ? 'Movie__Section on' : 'Movie__Section'}>
        <h3>{store.sortMethodName}</h3>
        <div className="Movie__Wrapper">
          { store.isMovieLoded ? renderMovie() : <div className="Loading"></div> }
          { store.isSuccessSearch ? null : <div className="Search__Failed"><strong>{store.searchWordFix}</strong> 로 검색한 결과가 없습니다.</div>}
        </div>
      </div>
      </>
    ));
}

export default MoviePage;