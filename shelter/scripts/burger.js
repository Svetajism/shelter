// ADD OVERLAY
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// ADD CLASS .MENU-OPEN
const body = document.body;
function openMenu() {
    body.classList.add('menu-open');
    body.style.overflow = 'hidden'; // scroll-lock
}

// REMOVE CLASS .MENU-OPEN
function closeMenu() {
    body.classList.remove('menu-open');
    body.style.overflow = ''; // снять scroll-lock
}

// FIND .BURGER-MENU
const burger = document.querySelector('.burger-menu');
overlay.addEventListener('click', closeMenu);

const nav = document.querySelector('.nav-bar');

nav.addEventListener('click', (e) => {
    const currentLink = e.target.closest('a');
    
    if (currentLink) {
        // 1. Находим старый активный пункт и убираем у него класс
        const activeLink = nav.querySelector('a.menu-active');
        if (activeLink) {
            activeLink.classList.remove('menu-active');
        }
        
        // 2. Добавляем класс текущей ссылке
        currentLink.classList.add('menu-active');
        
        // 3. Закрываем меню
        closeMenu();
    }
});

burger.addEventListener('click', () => {
    body.classList.contains('menu-open') ? closeMenu() : openMenu();
});

let helloBurger = 'burger';
console.log(helloBurger);