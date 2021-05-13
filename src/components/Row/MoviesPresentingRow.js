import React, {useEffect, useState} from "react";
import {NotificationManager} from 'react-notifications';
import Modal from 'react-modal';
import LazyLoad from 'react-lazyload';
import axios from "../../axios";
import './MoviesPresentingRow.scss';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
import {REACT_APP_TMDB_V3_API_KEY} from "../../requests";

const image_db_path = "https://image.tmdb.org/t/p/original/";

const customStyles = {
  content : {
    width                 : '80%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function MoviesPresentingRow({title, fetchUrl, isLargeRow}) {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "460",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setIsOpen(false);
    }
    movieTrailer(null, {apiKey: REACT_APP_TMDB_V3_API_KEY, tmdbId: movie?.id})
      .then((url) => {
        console.log(url);
        if (url == null) {
          NotificationManager.warning('No Trailer is available for this video!', 'Not Available', 3000);
          return;
        }
        setIsOpen(true);
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="movies_presenting_row">
      <LazyLoad height={200} once>
        <h2>{title}</h2>
        <div className="row_posters">
          {movies.map(movie => (
            isLargeRow == null && movie.backdrop_path == null ? "" : <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`movie_poster${isLargeRow ? " movie_poster_large" : ""}`}
              src={`${image_db_path}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        { trailerUrl && <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button onClick={closeModal} className="close_modal">X</button>
            <YouTube className="youtube_player" videoId={trailerUrl} opts={opts}/>
          </Modal>}
      </LazyLoad>
    </div>
  )
}

export default MoviesPresentingRow;