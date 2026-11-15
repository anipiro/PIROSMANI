import Painting from './painting.js';

export function showGreeting() {
  const greeting = document.getElementById('greeting');
  if (!greeting) return;

  const hour = new Date().getHours();

  if (hour < 12) {
    greeting.textContent = 'Good morning';
  } else if (hour < 18) {
    greeting.textContent = 'Good afternoon';
  } else {
    greeting.textContent = 'Good evening';
  }
}

export async function showDailyPainting() {
  const box = document.getElementById('daily');
  if (!box) return;

  try {
    const paintings = await Painting.loadAll();
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const painting = paintings[day % paintings.length];

    const image = box.querySelector('img');
    image.src = painting.image;
    image.alt = `${painting.title} by Niko Pirosmani`;

    box.querySelector('h3').textContent = painting.title;
    box.querySelector('.daily-details').textContent = painting.details;
    box.querySelector('.daily-about').textContent = painting.about;
    box.hidden = false;
  } catch (error) {
    console.error(error);
  }
}
