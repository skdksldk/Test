import { observable } from 'mobx';
import axios from 'axios';
import _ from 'lodash';


const store = observable({
    movieList: [], // 메인 영화 리스트
    isMovieLoded: false, // 영화가 로드외었는지 체크
    sortMethod: '', // 소트 방법
    sortMethodName: '현재 상영중인 영화', // 소트 이름
    movieBg: '', // 메인 bg
    isMovieSelected: false, // 영화가 선택외었는지 체크
    selectedMovie: [], // 선택된 영화

    getApi(sortPram) {
        // API 불러오기
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
            // 소트0 -> 현재상영중
            SORT = NOW_PLAYING;
            this.sortMethodName = '현재 상영중인 영화';
        } else if (sortPram == '1') {
            // 소트1 -> 최근인기있는 영화
            SORT = TRENDING;
            this.sortMethodName = '최근 인기있는 영화'
        } else if (sortPram == '2') {
            // 소트2 -> 고득점 영화
            SORT = TOP_RATED;
            this.sortMethodName = '최근 평점높은 영화'
        } else if (sortPram == '3') {
            // 소트3-> 업커밍 영화
            SORT = UPCOMING;
            this.sortMethodName = '최근 개봉 & 예정 영화'
        } else if (sortPram == '4') {
            // 소트4 -> 검색
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
        // 영화 리스트 불러오기
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
        // 영화리스트 동기화
        this.movieList = movieData
    },
    checkMovieLoad(movieObj) {
        // 영화 로딩 체크
        if (!_.isEmpty(movieObj)) return this.isMovieLoded = true;
        else return false;
    },
    setSearchSuccess() {
        // 검색 성공
        this.isSuccessSearch = true;
    },
    checkMovieLoad(movieObj) {
        // 영화 로딩 체크
        if (!_.isEmpty(movieObj)) return this.isMovieLoded = true;
        else return false;
    },
    changeMovieBg(theMovieBg) {
        // 메인 BG 영화리스트와 동기화
        this.movieBg = theMovieBg;
    },

})

export default store; 