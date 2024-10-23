import { fetchMovie } from "./fetch-movie.js";
import { viewBookmarkButton } from "./update-bookmark.js";
import { movieSearchEvent } from "./movie-search.js";

const apiUrl = "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1";

// 페이지에 접속하면 fetchMovie 함수를 실행
fetchMovie(apiUrl);

viewBookmarkButton();

movieSearchEvent();