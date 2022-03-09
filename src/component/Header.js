import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import store from '../store/MovieStore';

const styles = {
    tabsRoot: {},
    tabsIndicator: {
      backgroundColor: 'transparent',
    },
    tabRoot: {
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: [
          'Noto Sans KR',
          'Roboto',
          'sans-serif',
      ],
      opacity: '0.6',
      '&:hover': {
          color: '#fff',
          opacity: '.8',
      },
      '&tabSelected': {
          color: '#fff',
          opacity: '1',
      },
      '&:focus': {
          color: '#fff',
      }
    },
    tabSelected: {},
}

const Header = (props) => {

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const classes = props;

  const handleNowPlaying = () => {
    store.getMovies(0);
  };
  const handleTrending = () => {
    store.getMovies(1);
  };
  const handleTopRated = () => {
    store.getMovies(2);
  };
  const handleUpcoming = () => {
    store.getMovies(3);
  };
  const handleChange1 = (event, value) => {
    setValue1(value1);
  };
  const handleChange2 = (event, value) => {
    setValue2(value2);
  };
  const handleKeywordChange = (e) => {
    store._setSearchKeyword(e.target.value);
  };
  const handleSearch = () => {
    store._setKeywordFix();
    store._getMovies(4);
  };
  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleBackHome = () => {
    store.backHome();
    store.setClearSelectedMovie();
    store.setRecommendCountRestore();
    store.setCastCountRestore();
    store.setHideTrailer();
  };

  return useObserver(() => (
    <header className={store.isMovieSelected ? 'Header on' : 'Header'}>
      <div className="Header__Inner">
      <div className="Header__Search">
          <input
            type="text"
            placeholder="검색하기"
            onChange={handleKeywordChange}
            onKeyPress={handleKeypress}
          />
          <i className="fas fa-search"
            onClick={handleSearch}
          ></i>
        </div>
        <Tabs
          value={value1}
          onChange={handleChange1}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            label="현재 상영중인 영화"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            onClick={handleNowPlaying}
          />
          <Tab
            label="최근 인기있는 영화"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            onClick={handleTrending}
          />
          <Tab
            label="최근 평점높은 영화"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            onClick={handleTopRated}
          />
          <Tab
            label="최근 개봉 &amp; 예정 영화"
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            onClick={handleUpcoming}
          />
        </Tabs>
      </div>
      <div className="Header__Back">
        <Tabs
          value={value2}
          onChange={handleChange2}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            label="뒤로 가기"
            classes={{ root: classes.tabRoot}}
            onClick={handleBackHome}
          />
        </Tabs>
      </div>
    </header>
  ));
}

export default withStyles(styles)(Header);