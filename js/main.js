import { setupNav, setupToTop } from './nav.js';
import { showGreeting, showDailyPainting } from './home.js';
import { setupGallery } from './gallery.js';
import { setupForm } from './form.js';
import { setupQuiz } from './quiz.js';

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  setupToTop();
  showGreeting();
  showDailyPainting();
  setupGallery();
  setupForm();
  setupQuiz();
});
