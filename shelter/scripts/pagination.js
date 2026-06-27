import { getPets } from './api.js';
import { generateShuffled } from './utils.js';

const state = {
    allCards: [],
    currentPage: 1,
    cardsPerPage: getCardsPerPage(),
};

function getCardsPerPage() {
    const width = window.innerWidth;
    if (width >= 1280) return 8;
    if (width >= 768) return 6;
    return 3;
}

export async function initPagination() {
    const pets = await getPets();
    state.allCards = generateShuffled(pets);
    bindControls();
    render();

    window.addEventListener('resize', () => {
        const newCardsPerPage = getCardsPerPage();
        if (newCardsPerPage !== state.cardsPerPage) {
            state.cardsPerPage = newCardsPerPage;
            // не уходить дальше последней страницы при уменьшении экрана
            const total = getTotalPages();
            if (state.currentPage > total) state.currentPage = total;
            render();
        }
    });
}

function getSlice() {
    const start = (state.currentPage - 1) * state.cardsPerPage;
    const end = start + state.cardsPerPage;
    return state.allCards.slice(start, end);
}

function getTotalPages() {
  return Math.ceil(state.allCards.length / state.cardsPerPage);
}

function renderCards(cards) {
    const container = document.querySelector('.page__cards');
    container.innerHTML = '';

    cards.forEach(pet => {
        // card
        const card = document.createElement('div');
        card.className = 'card';

        // img
        const img = document.createElement('img');
        img.className = 'card__image';
        img.src = pet.img;
        img.alt = pet.name;

        // content wrapper
        const content = document.createElement('div');
        content.className = 'card__content';

        // name
        const name = document.createElement('h3');
        name.textContent = pet.name;

        // button
        const btn = document.createElement('button');
        btn.className = 'btn-secondary';
        btn.textContent = 'Learn more';

        // сборка
        content.appendChild(name);
        content.appendChild(btn);
        card.appendChild(img);
        card.appendChild(content);
        container.appendChild(card);
    });
}

function bindControls() {
  document.querySelector('.page__btn-first').addEventListener('click', () => {
    state.currentPage = 1; render();
  });
  document.querySelector('.page__btn-prev').addEventListener('click', () => {
    if (state.currentPage > 1) { state.currentPage--; render(); }
  });
  document.querySelector('.page__btn-next').addEventListener('click', () => {
    if (state.currentPage < getTotalPages()) { state.currentPage++; render(); }
  });
  document.querySelector('.page__btn-last').addEventListener('click', () => {
    state.currentPage = getTotalPages(); render();
  });
}

function updateControls() {
  const total = getTotalPages();
  const isFirst = state.currentPage === 1;
  const isLast = state.currentPage === total;

  document.querySelector('.page__btn-first').disabled = isFirst;
  document.querySelector('.page__btn-prev').disabled = isFirst;
  document.querySelector('.page__btn-next').disabled = isLast;
  document.querySelector('.page__btn-last').disabled = isLast;
  document.querySelector('.page__number').textContent = state.currentPage;
}

function render() {
  const container = document.querySelector('.page__cards');
  container.classList.add('fade-out');
  setTimeout(() => {
    renderCards(getSlice());
    updateControls();
    container.classList.remove('fade-out');
  }, 300);
}

const pagination = 'pagination'
console.log(pagination)