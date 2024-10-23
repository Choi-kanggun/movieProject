import { modalMovieCard } from "./fetch-movie.js";

const movieWrap = document.querySelector(".movie-wrap");

// 북마크 추가로 북마크에 나타낼 영화 카드를 movie-wrap에 붙여서 화면에 나타낸다.
export const makeBookmark = (response) => {
    const imgUrl = 'https://image.tmdb.org/t/p/w500' + response['poster_path'];
    const movieTitle = response['title'];
    const movieRating = response['vote_average'];
    const id = response['id'];
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const tempHtml = `
        <div class="movie-image">
            <img src='${imgUrl}' alt="영화 포스터">
        </div>
        <div class="movie-content">
            <div class="movie-title">
                <span>${movieTitle}</span>
            </div>
            <div class="movie-rating">
                <span>평점: ${movieRating}<span>
            </div>
        </div>`;
    card.innerHTML = tempHtml;
    card.addEventListener("click", () => {
        modalMovieCard(id);
    });
    movieWrap.appendChild(card);
};