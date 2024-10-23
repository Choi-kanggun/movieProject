import { bookmarkWrapper } from "./fetch-movie.js";

const addBookmarkBtn = document.querySelector("#bookmark-add");
const cancelBookmarkBtn = document.querySelector("#bookmark-cancel");
const viewBoockmartBtn = document.querySelector(".view-BoockmarkBtn");

// 로컬스토리지에 현재 영화 모달 카드의 id 저장 유무를 확인하고, 추가 또는 취소 버튼이 나옴
export const updateBookmarkBtn = (currentId) => {
    const savedIdList = JSON.parse(localStorage.getItem("movieIdList"));
    let movieIdList = savedIdList ? savedIdList : [];
    if (movieIdList.includes(currentId)) {
        addBookmarkBtn.style.display = "none";
        cancelBookmarkBtn.style.display = "block";

    } else {
        addBookmarkBtn.style.display = "block";
        cancelBookmarkBtn.style.display = "none";
    };
};

// 북마크보기 버튼을 클릭하면 북마크 페이지가 나온다.
export const viewBookmarkButton = () => {
    viewBoockmartBtn.addEventListener("click", () => {
        bookmarkWrapper();
    });
};
