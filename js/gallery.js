import Painting from './painting.js';
import { setupModal } from './modal.js';

function createCard(painting, index) {
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;
  card.dataset.index = index;

  const image = document.createElement('img');
  image.src = painting.image;
  image.alt = `${painting.title} by Niko Pirosmani`;
  image.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.textContent = painting.title;

  const details = document.createElement('p');
  details.textContent = painting.details;

  body.append(title, details);
  card.append(image, body);
  return card;
}

export async function setupGallery() {
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  const filterButtons = document.querySelectorAll('.filter');
  const search = document.getElementById('search');
  const sort = document.getElementById('sort');
  const count = document.getElementById('count');
  const openModal = setupModal();

  let paintings = [];
  let visible = [];
  let category = 'all';

  try {
    paintings = await Painting.loadAll();
  } catch (error) {
    console.error(error);
    count.textContent =
      'The paintings could not be loaded. Refresh the page to try again.';
    return;
  }

  function sortList(list) {
    switch (sort.value) {
      case 'az':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'za':
        return list.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return list;
    }
  }

  function render() {
    const text = search.value.trim();
    const filtered = paintings.filter(
      (painting) => painting.isIn(category) && painting.matches(text)
    );

    visible = sortList(filtered);
    grid.innerHTML = '';

    visible.forEach((painting, index) => {
      grid.append(createCard(painting, index));
    });

    if (visible.length === 0) {
      count.textContent = `Nothing matches "${text}". Try another title or choose All.`;
    } else {
      count.textContent = `Showing ${visible.length} of ${paintings.length} paintings`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((other) => {
        other.classList.remove('active');
        other.setAttribute('aria-pressed', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      category = button.dataset.category;
      render();
    });
  });

  search.addEventListener('input', render);
  sort.addEventListener('change', render);

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) openModal(visible, Number(card.dataset.index));
  });

  grid.addEventListener('keydown', (event) => {
    const card = event.target.closest('.card');
    if (card && event.key === 'Enter') {
      openModal(visible, Number(card.dataset.index));
    }
  });

  render();
}
