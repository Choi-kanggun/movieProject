import { updateBookmarkBtn } from "./update-bookmark.js";
const modalMoviePoster = document.querySelector(".modal-posterbox img");
const modalMovieTitle = document.querySelector(".modal-movie-title");
const modalMovieContent = document.querySelector(".modal-movie-content");
const modalMovieRelease = document.querySelector(".modal-movie-release");
const modalMovieRating = document.querySelector(".modal-movie-rating");
const modalWrap = document.querySelector(".modal-wrap");
const modalCard = document.querySelector(".modal-card");

// 전달 받은 영화 id의 모달창을 만드는 함수
export const makeModal = (response) => {
    const imgUrl = `https://image.tmdb.org/t/p/w500${response['poster_path']}`
    const movieTitle = response.title;
    const movieOverview = response.overview;
    const movierelease = response.release_date;
    const movieRating = response.vote_average;
    modalMoviePoster.src = imgUrl;
    modalMoviePoster.alt = "영화 포스터";
    
    modalMovieTitle.innerText = `${movieTitle}`;
    modalMovieContent.innerText = `${movieOverview}`;
    modalMovieRelease.innerText = `개봉일: ${movierelease}`;
    modalMovieRating.innerText = `평점: ${movieRating}`;
    
    // 카드가 클릭되면 모달 페이지가 none에서 block으로 바뀌어 화면에 표시
    modalWrap.style.display = 'block';
    modalCard.scrollTo(0, 0);;
    // 카드의 세로길이보다 내용이 길면 스크롤표시
    modalCard.style = 'overflow-y:scroll';
    
    // 모달 북마크 추가,삭제 버튼 업데이트
    updateBookmarkBtn(response.id);
};