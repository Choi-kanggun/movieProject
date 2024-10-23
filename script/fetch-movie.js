import { makeCard } from './make-card.js';
import { makeModal } from './make-modal.js';
import { makeBookmark } from './make-bookmark.js';
import { updateBookmarkBtn } from "./update-bookmark.js";
const modalWrap = document.querySelector(".modal-wrap");
const modalCloseBtn = document.querySelector(".modal-closeBtn");
const addBookmarkBtn = document.querySelector("#bookmark-add");
const cancelBookmarkBtn = document.querySelector("#bookmark-cancel");

const movieWrap = document.querySelector(".movie-wrap");
// 현재 클릭한 모달창의 id를 저장하기 위한 변수
let currentId = null;
// API를 가져오기 위해 TMDB에 요청
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTEzY2Q4NTFmMTkzMDVjNTM4YjZhZTJmMDBlODRlYSIsIm5iZiI6MTcyOTEyNTU1MC4wMDI3OTYsInN1YiI6IjY3MGU1ODFhZDVmOTNhM2RhMGJjM2UwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.502pUhWLjkIiwNgSwa21Cg2gGcWvmo-sOOPJZXGV7gA'
    }
};

// 인기영화 20개 API로 불러와서 웹 페이지에 표시할 함수
export const fetchMovie = async (Url) => {
    movieWrap.innerHTML = ""
    try {
        const response = await ((await fetch(Url, options)).json());
        const movieList = response['results'];

        // fetch로 받은 정보로 영화 카드를 만들어서 movie-wrap에 붙이는 함수
        makeCard(movieList);
    }
    catch (err) {
        (err => console.error(err));
    };
};

// 클릭된 영화 카드의 id를 받아와서 해당 영화 카드의 모달창을 만드는 함수
export const modalMovieCard = async (movieId) => {
    currentId = movieId;
    try {
        const response = await ((await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko&page=1`, options)).json());

        // 모달창을 만드는 함수에 클릭된 영화의 id를 인자로 넣어 해당 영화의 모달창을 만든다.
        makeModal(response);
    } catch (err) {
        (err => console.error(err));
    };
};

export const bookmarkWrapper = () => {
    const savedIdList = JSON.parse(localStorage.getItem("movieIdList"));
    // 북마크에 추가된 영화만 나타내기 위하여 기존 movie-wrap의 영화 카드들을 비워준다.
    movieWrap.innerHTML = ""

    // 로컬스토리지가 비어있으면 alert창을 띄우고 첫 화면으로 돌아간다.
    if (savedIdList.length === 0) {
        alert("북마크에 추가된 영화가 없습니다.");
        fetchMovie("https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1");
    
    // 로컬스토리지가 비어있지 않으면, 
    // 로컬스토리지에 저장된 id배열의 길이만큼 순회하며 북마크에 카드를 생성한다.
    } else {
        savedIdList.forEach((savedId) => {
            fetch(`https://api.themoviedb.org/3/movie/${savedId}?language=ko&page=1`, options)
                .then(response => response.json())
                .then(response => {
                    makeBookmark(response);
                })
                .catch(err => console.error(err));
        });
    }
};


// 영화 카드 모달창 클릭 이벤트
modalWrap.addEventListener("click", (event) => {
    // 모달 카드 바깥을 클릭하거나, x버튼을 누르면 모달페이지 숨김
    if (event.target === event.currentTarget || event.target === modalCloseBtn) {
        modalWrap.style.display = 'none';
    };

    // 북마크 추가 버튼을 누르면 로컬스토리지에 저장하고 취소버튼이 나온다.
    if (event.target === addBookmarkBtn) {
        const savedIdList = JSON.parse(localStorage.getItem("movieIdList"));
        let movieIdList = savedIdList ? savedIdList : [];

        if (!movieIdList.includes(currentId) && currentId !== null) {
            alert("영화가 북마크에 추가되었습니다.");
            movieIdList.push(currentId);

            localStorage.setItem('movieIdList', JSON.stringify(movieIdList));
            // 북마크를 추가하면 추가 버튼이 none되고 삭제 버튼이 block된다.
            updateBookmarkBtn(currentId);
            modalWrap.style.display = 'none';
        };
    };

    // 북마크 취소 버튼을 누르면 로컬스토리지에 저장된 id배열값을 순회하며,
    // 현재 모달 카드의 영화 id를 없앤 배열을 재할당하고 버튼 업데이트
    if (event.target === cancelBookmarkBtn && currentId !== null) {
        const savedIdList = JSON.parse(localStorage.getItem("movieIdList"));
        const movieIdList = savedIdList ? savedIdList : [];
        const newMovieIdList = movieIdList.filter(id => id !== currentId);

        localStorage.setItem('movieIdList', JSON.stringify(newMovieIdList));
        alert("영화가 북마크에서 제거되었습니다.");
        // 북마크를 삭제하면 삭제버튼이 none되고 추가 버튼이 block된다.
        updateBookmarkBtn(currentId);
        bookmarkWrapper();
        modalWrap.style.display = 'none';
    };
});
