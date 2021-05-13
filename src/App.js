import './App.css';

import './requests';
import React, {useEffect, useState} from "react";
import Row from "./components/Row/Row";
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
      console.log(request);
      setGenres(request.data.genres);
      return request;
    }
    fetchData();
  }, []);


  return (
    <div className="App">
      <h1>Netflix Clone Front End</h1>
      <Row title="NETFLIX ORIGINALS" fetchUrl={getFetchNetflixOriginalsRequest()} />
      <Row title="Trending Now" fetchUrl={getFetchTrendingRequest()} />
      { genres.map(genre => (
        <Row
          title={genre.name + " Movies"}
          fetchUrl={getFetchMoviesWithGenresRequest([genre.id])}
        />
      ))}
    </div>
  );
}

export default App;
