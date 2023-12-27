import { isAlive } from "../../utils/isAlive.js";

export function createCharacterCard(character) {
  const card = document.createElement("li");

  const statusCharacter = isAlive[character.status] || "unknown";

  card.classList.add("card", `background__${statusCharacter}`);
  card.innerHTML = `
    <div class="card__image-container ${statusCharacter}">
        <img class="card__image" src="${character.image}" alt="${character.name}">
        <div class="card__image-gradient"></div>
      </div>
      <div class="card__content">
        <h2 class="card__title">${character.name}</h2>
        <dl class="card__info">
          <dt class="card__info-title">Status</dt>
          <dd class="card__info-description ${statusCharacter}">${character.status}</dd>
          <dt class="card__info-title">Type</dt>
          <dd class="card__info-description">${character.species}</dd>
          <dt class="card__info-title">Last known location:</dt>
          <dd class="card__info-description">${character.location.name}</dd>
        </dl>
      </div>
    `;

  return card;
}
