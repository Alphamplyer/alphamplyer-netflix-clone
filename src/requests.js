const REACT_APP_TMDB_V3_API_KEY = process.env.REACT_APP_TMDB_V3_API_KEY;

const LANGUAGE = "en-US";
const NETFLIX_NETWORK = 213;

function clampPage(actualPage, max = -1) {
  if (actualPage < 1)
    return 1;
  if (max === -1)
    return actualPage;
  if (actualPage > max)
    return max;
  return actualPage;
}

export function getFetchTrendingRequest() {
  return `/trending/all/week?api_key=${REACT_APP_TMDB_V3_API_KEY}` +
    `&language=${LANGUAGE}`;
}

export function getFetchNetflixOriginalsRequest(page = 1) {
  page = clampPage(page, -1);
  return `/discover/tv?` +
    `api_key=${REACT_APP_TMDB_V3_API_KEY}` +
    `&language=${LANGUAGE}` +
    `&with_networks=${NETFLIX_NETWORK}` +
    `&page=${page}`;
}

export function getFetchTopRatedMoviesRequest(page = 1) {
  page = clampPage(page, 1000);
  return `/movie/top_rated?api_key=${REACT_APP_TMDB_V3_API_KEY}&language=${LANGUAGE}&page=${page}`;
}

export function getFetchMoviesWithGenresRequest(genres_ids, page = 1) {
  page = clampPage(page, 1000);
  return `/discover/movie?` +
    `api_key=${REACT_APP_TMDB_V3_API_KEY}` +
    `&language=${LANGUAGE}` +
    `&with_genres=${genres_ids.join(',')}` +
    `&page=${page}`;
}

export function getMovieGenresRequest() {
  return `/genre/movie/list?` +
    `api_key=${REACT_APP_TMDB_V3_API_KEY}` +
    `&language=${LANGUAGE}`;
}

export function getMovieDataRequest(id) {
  return `/movie/${id}` +
    `api_key=${REACT_APP_TMDB_V3_API_KEY}` +
    `&language=${LANGUAGE}`;
}