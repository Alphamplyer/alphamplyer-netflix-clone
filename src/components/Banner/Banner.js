import React, {useEffect, useState} from "react";
import {getFetchNetflixOriginalsRequest} from "../../requests";
import axios from "../../axios";
import './Banner.scss';

const image_db_path = "https://image.tmdb.org/t/p/original/";

function Banner({ title }) {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(getFetchNetflixOriginalsRequest());
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${image_db_path}${movie?.backdrop_path || "none"})`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{ movie?.title || movie?.name || movie?.original_name }</h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <p className="banner_description">{ truncate(movie?.overview, 150) }</p>
      </div>

      <div className="banner-fade-bottom" />
    </header>
  );
}

export default Banner;