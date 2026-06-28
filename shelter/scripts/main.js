import { initPagination } from './pagination.js';
import { initCarousel } from './carousel.js';
import { initPopup } from './popup.js';
import { getPets } from './api.js';

async function init() {
  const pets = await getPets();

  // Pets page
  if (document.querySelector('.page__cards')) {
    initPagination(pets);
  }

  // Main page
  if (document.querySelector('.slider__line')) {
      initCarousel(pets);
  }

  // Popup — на обеих страницах
  if (document.getElementById('popupOverlay')) {
      initPopup(pets);
  }
}

init();