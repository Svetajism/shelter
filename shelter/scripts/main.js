import { initPagination } from './pagination.js';
import { initCarousel } from './carousel.js';

// Pets page
if (document.querySelector('.page__cards')) {
  initPagination();
}

// Main page
if (document.querySelector('.slider__line')) {
    initCarousel();
}