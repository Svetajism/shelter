export function generateShuffled(pets) {
    let deck = pets.flatMap(pet => Array(6).fill(pet));

    let attempts = 0;
    while (attempts < 1000) {
        shuffle(deck); // Fisher-Yates
        if (!hasAdjacentDuplicates(deck)) return deck;
        attempts++;
    }
    return deck;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function hasAdjacentDuplicates(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].name === arr[i + 1].name) return true;
  }
  return false;
}

// CAROUSEL
export function shuffled(arr) {
    const copy = [...arr]; // не мутируем оригинал
    shuffle(copy);         // shuffle уже есть — используем его
    return copy;
}

export function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
