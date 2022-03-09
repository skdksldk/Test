import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import Movie from '../component/Movie';
import MovieDetail from '../component/MovieDetail';
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

    const renderDetail = () => {
     const detailInfo = store.selectedMovie;
     console.log("확인5 : "+detailInfo.runtime);
     console.log("확인3 : "+detailInfo);
     return <MovieDetail
              key={detailInfo.id}
              title={detailInfo.title}
              og_title={detailInfo.original_title}
              poster={detailInfo.poster_path}
              runtime={detailInfo.runtime}
              vote_average={detailInfo.vote_average}
              genre={detailInfo.genres}
              summary={detailInfo.overview}
              tagline={detailInfo.tagline}
              store={store}
            />
    };

    const handleCloseTrailer = () => {
      store.setHideTrailer();
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
          <div className={store.isMovieSelected ? 'Detail__Info on' : 'Detail__Info'} dir="rtl">
            <div dir="ltr">{store.isMovieSelected ? renderDetail() : null}</div>
          </div>
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