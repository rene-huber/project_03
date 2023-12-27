import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

let maxPage = 1;
let page = 1;
let searchQuery = "";

const fetchCharacters = async () => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const data = await res.json();

  let characters = data.results.map((eachCharacter) =>
    createCharacterCard(eachCharacter)
  );

  cardContainer.innerHTML = "";
  cardContainer.append(...characters);
  maxPage = data.info.pages;

  updatePagination();
  displayPagination();
};

const updatePagination = () => {
  pagination.textContent = `Page ${page} of ${maxPage}`;
};
updatePagination();

const displayPagination = () => {
  prevButton.style.display = page === 1 ? "none" : "block";
  nextButton.style.display = page === maxPage ? "none" : "block";
};

function prevButtonDisplay() {
  prevButton.style.display = "block";
}

// prevButtonDisplay();

prevButton.addEventListener("click", () => {
  if (page >= 1) {
    page = page - 1;
    displayPagination();
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  page = page < maxPage ? page + 1 : page;
  displayPagination();
  fetchCharacters();
});

searchBarContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = searchBar.value;
  fetchCharacters();
  page = 1;
});

fetchCharacters();
