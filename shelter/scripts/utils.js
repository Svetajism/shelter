// Создание массива из 48 элементов
function createExtendedArray(pets) {
    const extended = [];
    for (let i=0; i < 6; i++) {
        extended.push(...pets);
    }

    // Функция перемешивания Fisher–Yates
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array;
    }

    // Проверка на соседние дубли
    function hasAdjacentDuplicates(array) {
        for (let i = 0; i < array.length - 1; i++) {
            if (array[i].id === array[i + 1].id) {
                return true;
            }
        }
        return false;
    }

    // Перемешивание, пока нет соседних дублей
    let result = shuffle([...extended]);
    while (hasAdjacentDuplicates(result)) {
        result = shuffle([...extended]);
    }

    return result;
}

export function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}
