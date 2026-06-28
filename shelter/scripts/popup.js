// popup.js

export function initPopup(pets) {
    // 1. Находим overlay в DOM
    const overlay = document.getElementById('popupOverlay');

    // 2. Делегирование: вешаем один обработчик на весь документ,
    //    ловим клик по карточке через closest()
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');  // нашли ли мы карточку?
        if (!card) return;                        // нет — выходим

        // data-pet-name хранит имя питомца, которое мы запишем в шаге 5
        const petName = card.dataset.petName;
        const pet = pets.find(p => p.name === petName);
        if (!pet) return;

        openPopup(pet, overlay);
    });

    // 3. Закрытие по клику на overlay (НО НЕ на сам popup)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup(overlay);
    });

    // 4. Закрытие по кнопке-крестику
    overlay.querySelector('.popup__close').addEventListener('click', () => {
        closePopup(overlay);
    });

    // 5. Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup(overlay);
    });
}

function openPopup(pet, overlay) {
    // Заполняем поля
    overlay.querySelector('.popup__img').src = pet.img;
    overlay.querySelector('.popup__img').alt = pet.name;
    overlay.querySelector('.popup__title').textContent = pet.name;
    overlay.querySelector('.popup__subtitle').textContent = `${pet.type} - ${pet.breed}`;
    overlay.querySelector('.popup__description').textContent = pet.description;
    overlay.querySelector('.popup__age').textContent = pet.age;
    overlay.querySelector('.popup__inoculations').textContent = pet.inoculations.join(', ');
    overlay.querySelector('.popup__diseases').textContent = pet.diseases.join(', ');
    overlay.querySelector('.popup__parasites').textContent = pet.parasites.join(', ');

    // Показываем overlay
    overlay.classList.add('popup-open');
    overlay.setAttribute('aria-hidden', 'false');

    // Scroll-lock
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; // html

}

function closePopup(overlay) {
    overlay.classList.remove('popup-open');
    overlay.setAttribute('aria-hidden', 'true');

    // Снимаем scroll-lock
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}