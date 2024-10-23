import { modalMovieCard } from "./fetch-movie.js";

const movieWrap = document.querySelector(".movie-wrap");
const cancelBookmarkBtn = document.querySelector("#bookmark-cancel");

// movie-wrap에 movieList로 받은 목록들을 카드로 만들어서 화면에 표시한다.
export const makeCard = (movieList) => {
    let tempHtml = ``;
    movieList.forEach(movie => {
        const imgUrl = 'https://image.tmdb.org/t/p/w500' + movie['poster_path'];
        const movieTitle = movie['title'];
        const movieRating = movie['vote_average'];
        const id = movie['id'];
        const card = document.createElement("div");
        card.classList.add("movie-card");

        // html에 나타낼 구조를 작성
        tempHtml = `
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

        // 작성한 html 구조를 카드 div에 넣기
        card.innerHTML = tempHtml;

        // 카드가 클릭이 되면 해당 카드id로 모달창 띄우기
        card.addEventListener("click", () => {
            cancelBookmarkBtn.style.display = "none";
            modalMovieCard(id);
        });

        // 완성된 카드를 영화 목록 영역에 자식으로 추가하여 화면에 표시
        movieWrap.appendChild(card);
    });
};
