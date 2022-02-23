import { observable } from 'mobx';
import axios from 'axios';
import _ from 'lodash';


const store = observable({
    movieList: [],
    isMovieLoded: false,
    sortMethod: '',
    sortMethodName: '현재 상영중인 영화',
    movieBg: '',
    isMovieSelected: false,
    selectedMovie: [],

    getApi(sortPram) {

        let SORT = '';
        const NOW_PLAYING = '/movie/now_playing';
        const TRENDING = '/trending/movie/week';
        const TOP_RATED = '/movie/top_rated';
        const UPCOMING = '/movie/upcoming';
        const searchKeyword = '&query=' + this.searchWordFix;
        const SEARCH = '/search/movie';
        const DEFAULT_URL = 'https://api.themoviedb.org/3';
        const API_KEY = '?api_key=cd966d78c5d6f111808969f4fa31cf71';
        const LANGUAGE_KR = '&language=ko-KR';

        if (sortPram == '0') {

            SORT = NOW_PLAYING;
            this.sortMethodName = '현재 상영중인 영화';
        } else if (sortPram == '1') {

            SORT = TRENDING;
            this.sortMethodName = '최근 인기있는 영화'
        } else if (sortPram == '2') {

            SORT = TOP_RATED;
            this.sortMethodName = '최근 평점높은 영화'
        } else if (sortPram == '3') {

            SORT = UPCOMING;
            this.sortMethodName = '최근 개봉 & 예정 영화'
        } else if (sortPram == '4') {

            SORT = SEARCH;
            this.sortMethodName = this.searchWordFix + ' 키워드로 검색한 영화'

            return axios.get(DEFAULT_URL + SORT + API_KEY + LANGUAGE_KR + searchKeyword)
                .then(response => response.data)
                .catch(err => console.log(err))
        }

        return axios.get(DEFAULT_URL + SORT + API_KEY + LANGUAGE_KR)
            .then(response => response.data)
            .catch(err => console.log(err))
    },

    async getMovies(sortPram) {

        const movies = await this.getApi(sortPram);
        if (movies.results.length <= 0) {
            this.setSearchFailed();
        } else {
            this.setMovie(movies.results);
            // console.log(this.movieList);
            this.setSearchSuccess();
            this.checkMovieLoad(this.movieList);
            this.changeMovieBg(this.movieList[0].backdrop_path);
        }
    },
    setMovie(movieData) {

        this.movieList = movieData
    },
    checkMovieLoad(movieObj) {

        if (!_.isEmpty(movieObj)) return this.isMovieLoded = true;
        else return false;
    },
    setSearchSuccess() {

        this.isSuccessSearch = true;
    },
    checkMovieLoad(movieObj) {

        if (!_.isEmpty(movieObj)) return this.isMovieLoded = true;
        else return false;
    },
    changeMovieBg(theMovieBg) {

        this.movieBg = theMovieBg;
    },

})

export default store; 