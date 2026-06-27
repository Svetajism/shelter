import { fetchPets } from './api.js';
import { createExtendedArray } from './utils.js';
import { getCardsPerPage, renderCards, updateControls, extendedPets } from './pagination.js';

document.addEventListener('DOMContentLoaded', async () => {
    const cardsContainer = document.querySelector('.page__cards');
    const paginationContainer = document.querySelector('.pagination');

    if (!cardsContainer && !paginationContainer) {
        return;
    }
    
    // Получаем питомцев и генерируем массив из 48 штук
    const pets = await fetchPets();
    const generated = createExtendedArray(pets);
    
    // Наполняем экспортированный пустой массив данными 
    // (мутация массива через push разрешена для экспортируемых объектов)
    extendedPets.length = 0;
    extendedPets.push(...generated);

    // Первоначальный запуск отрисовки
    renderCards();
    updateControls();
});