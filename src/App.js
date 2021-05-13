import './App.css';

import './requests';
import React, {useEffect, useState} from "react";
import Nav from "./components/Nav/Nav";
import Banner from "./components/Banner/Banner";
import MoviesPresentingRow from "./components/Row/MoviesPresentingRow";
import {
  getFetchMoviesWithGenresRequest,
  getFetchNetflixOriginalsRequest,
  getFetchTrendingRequest,
  getMovieGenresRequest
} from "./requests";
import axios from "./axios";

function App() {

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const request = await axios.get(getMovieGenresRequest());
      setGenres(request.data.genres);
      return request;
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <Nav />
      <Banner />
      <MoviesPresentingRow title="NETFLIX ORIGINALS" fetchUrl={getFetchNetflixOriginalsRequest()} isLargeRow />
      <MoviesPresentingRow title="Trending Now" fetchUrl={getFetchTrendingRequest()} />
      { genres.map(genre => (
        <MoviesPresentingRow key={genre.name}
                             title={genre.name + " Movies"}
                             fetchUrl={getFetchMoviesWithGenresRequest([genre.id])}
        />
      ))}
    </div>
  );
}

export default App;
