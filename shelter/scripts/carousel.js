import { getPets } from './api.js';
import { shuffled, debounce } from './utils.js';

// === СОСТОЯНИЕ ===
const state = {
    allPets: [],        // все 8 питомцев из JSON
    currentGroup: [],   // те, что сейчас видны
    isAnimating: false, // блокировка во время анимации
};

// === ТОЧКА ВХОДА ===
export async function initCarousel() {
    state.allPets = await getPets();
    state.currentGroup = pickNextGroup([]);  // первый показ: все доступны
    renderCards(state.currentGroup);
    bindControls();
}

// === АЛГОРИТМ: выбрать следующую группу ===
function pickNextGroup(excludeGroup) {
    const size = getGroupSize();

    // available — все питомцы, которых НЕТ в текущей группе
    const available = state.allPets.filter(
        pet => !excludeGroup.includes(pet)
    );

    // перемешать и взять первые N
    return shuffled(available).slice(0, size);
}

// === СКОЛЬКО КАРТОЧЕК ПОКАЗЫВАТЬ ===
function getGroupSize() {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
}

// === ОТРИСОВКА КАРТОЧЕК ===
function renderCards(pets) {
    const line = document.querySelector('.slider__line');
    line.innerHTML = '';

    pets.forEach(pet => {
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
        line.appendChild(card);
    });
}

// === АНИМИРОВАННЫЙ ПЕРЕХОД ===
// direction: 'left' (→ вперёд) или 'right' (← назад)
function animateTransition(direction, nextGroup) {
    if (state.isAnimating) return; // игнорим клик во время анимации
    state.isAnimating = true;

    const line = document.querySelector('.slider__line');

    // Определяем, откуда приедут новые карточки
    // direction 'left': текущие уезжают влево, новые приезжают справа
    const exitTo   = direction === 'left' ? '-100%' : '100%';
    const enterFrom = direction === 'left' ? '100%'  : '-100%';

    // 1. Уезжаем
    line.style.transition = 'transform 0.4s ease';
    line.style.transform = `translateX(${exitTo})`;

    // 2. Ждём конца анимации
    line.addEventListener('transitionend', function onEnd() {
        line.removeEventListener('transitionend', onEnd); // одноразовый слушатель

        // 3. Ставим новые карточки «за кадром» с нужной стороны
        renderCards(nextGroup);
        line.style.transition = 'none';       // отключаем transition
        line.style.transform = `translateX(${enterFrom})`;

        // 4. Принудительный reflow — браузер «замечает» новую позицию
        line.getBoundingClientRect();

        // 5. Включаем transition обратно и едем в центр
        line.style.transition = 'transform 0.4s ease';
        line.style.transform = 'translateX(0)';

        // 6. Ждём конец въезда
        line.addEventListener('transitionend', function onEnter() {
            line.removeEventListener('transitionend', onEnter);
            state.currentGroup = nextGroup; // обновляем состояние
            state.isAnimating = false;      // снимаем блокировку
        }, { once: true });
    }, { once: true });
}

// === НАВЕШИВАЕМ СОБЫТИЯ НА СТРЕЛКИ ===
function bindControls() {
    // Все кнопки «назад» и «вперёд» (desktop + mobile)
    const prevBtns = document.querySelectorAll('[aria-label="Previous slide"]');
    const nextBtns = document.querySelectorAll('[aria-label="Next slide"]');

    prevBtns.forEach(btn => btn.addEventListener('click', () => {
        const next = pickNextGroup(state.currentGroup);
        animateTransition('right', next);
    }));

    nextBtns.forEach(btn => btn.addEventListener('click', () => {
        const next = pickNextGroup(state.currentGroup);
        animateTransition('left', next);
    }));

    // Пересчитать группу при смене размера экрана
    window.addEventListener('resize', debounce(() => {
        if (!state.isAnimating) {
            state.currentGroup = pickNextGroup([]);
            renderCards(state.currentGroup);
        }
    }, 300));
}