import React, {useEffect, useState} from "react";
import LazyLoad from 'react-lazyload';
import axios from "../../axios";
import './MoviesPresentingRow.scss';

const image_db_path = "https://image.tmdb.org/t/p/original/";

function MoviesPresentingRow({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);


  return (
    <div className="movies_presenting_row">
      <LazyLoad height={200} once>
        <h2>{title}</h2>
        <div className="row_posters">
          {movies.map(movie => (
            isLargeRow == null && movie.backdrop_path == null ? "" : <img
                key={movie.id}
                className={ `movie_poster${isLargeRow ? " movie_poster_large" : ""}` }
                src={ `${image_db_path}${isLargeRow ? movie.poster_path : movie.backdrop_path}` }
                alt={movie.name}
              />
          ))}
        </div>
      </LazyLoad>
    </div>
  )
}

export default MoviesPresentingRow;