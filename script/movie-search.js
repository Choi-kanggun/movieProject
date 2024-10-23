import { fetchMovie } from "./fetch-movie.js";

const search = document.getElementById("search");
const apiUrl = "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1";

// 검색 입력창에 키보드 키가 입력되면 이벤트를 발생시켜서 해당 이벤트가 엔터키면 검색이 됨
// 빈 문자열로 엔터키를 누르면 첫 화면 표시
export const movieSearchEvent = () =>{
    search.addEventListener('keyup', (event) => {
        if (search.value && event.keyCode === 13) {
            fetchMovie(`https://api.themoviedb.org/3/search/movie?&query=${search.value.toLowerCase()}&language=ko&page=1`);
        } else if (search.value === "" && event.keyCode === 13) {
            fetchMovie(apiUrl);
        };
    });
};