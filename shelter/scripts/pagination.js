import { debounce } from './utils.js'; // Импортируем дебаунс сюда

export let extendedPets = [];
export let currentPage = 1;
export let itemsPerPage = 8;

export function getCardsPerPage() {
    const width = window.innerWidth || document.documentElement.clientWidth;
    if (width >= 1280) return 8;
    if (width >= 768) return 6;
    return 3;
}

// Функция адаптива под экран
function handleResize() {
    const newItemsPerPage = getCardsPerPage();

    // Если количество карточек на страницу изменилось
    if (itemsPerPage !== newItemsPerPage) {
        itemsPerPage = newItemsPerPage;
        
        const maxPage = Math.ceil(extendedPets.length / itemsPerPage);
        if (currentPage > maxPage) {
            currentPage = maxPage;
        }
        
        // Перерисовываем всё под новый размер
        renderCards();
        updateControls();
    }
}

// Вешаем ОДИН оптимизированный слушатель resize прямо тут
window.addEventListener("resize", debounce(handleResize, 200));

// Рендер карточек (ДОБАВИЛИ export)
export function renderCards() {
    const containerCards = document.querySelector('.page__cards');
    if (!containerCards) return; // Защита от ошибок, если элемента нет на странице
    
    containerCards.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = extendedPets.slice(start, end);

    pageItems.forEach(pet => {
       const card = document.createElement('div');
       card.classList.add('card');
       
       card.innerHTML = `
        <img class="card__image" src="${pet.img}" alt="${pet.name}">
        <div class="card__content">
            <h3>${pet.name}</h3>
            <button class="btn-secondary">Learn more</button>
        </div>
       `;
       containerCards.appendChild(card);
    });
}

// Управление кнопками (ДОБАВИЛИ export)
const btnFirst = document.querySelector(".page__btn-first");
const btnPrev = document.querySelector(".page__btn-prev");
const btnNext = document.querySelector(".page__btn-next");
const btnLast = document.querySelector(".page__btn-last");

export function updateControls() {
    const pageNumberEl = document.querySelector(".page__number");
    if (!pageNumberEl) return;

    // Считаем maxPage динамически на основе длины массива (вдруг там не 48 элементов)
    const maxPage = Math.ceil(extendedPets.length / itemsPerPage);
    pageNumberEl.textContent = currentPage;

    function setBtnState(btn, isActive) {
        if (!btn) return;
        if (isActive) {
            btn.classList.remove("page__btn-inactive");
            btn.classList.add("page__btn");
            btn.disabled = false;
        } else {
            btn.classList.add("page__btn-inactive");
            btn.classList.remove("page__btn");
            btn.disabled = true;
        }
    }

    if (currentPage === 1) {
        setBtnState(btnFirst, false);
        setBtnState(btnPrev, false);
        setBtnState(btnNext, true);
        setBtnState(btnLast, true);
    } else if (currentPage === maxPage) {
        setBtnState(btnFirst, true);
        setBtnState(btnPrev, true);
        setBtnState(btnNext, false);
        setBtnState(btnLast, false);
    } else {
        setBtnState(btnFirst, true);
        setBtnState(btnPrev, true);
        setBtnState(btnNext, true);
        setBtnState(btnLast, true);
    }
}

// События кликов по кнопкам пагинации
if (btnFirst) btnFirst.addEventListener("click", () => {
  currentPage = 1;
  updateControls();
  renderCards();
});

if (btnPrev) btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateControls();
    renderCards();
  }
});

if (btnNext) btnNext.addEventListener("click", () => {
  const maxPage = Math.ceil(extendedPets.length / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    updateControls();
    renderCards();
  }
});

if (btnLast) btnLast.addEventListener("click", () => {
  currentPage = Math.ceil(extendedPets.length / itemsPerPage);
  updateControls();
  renderCards();
});