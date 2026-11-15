export function setupModal() {
  const modal = document.getElementById('modal');
  const image = modal.querySelector('img');
  const caption = modal.querySelector('.modal-caption');
  const closeButton = modal.querySelector('.modal-close');
  const prevButton = modal.querySelector('.modal-prev');
  const nextButton = modal.querySelector('.modal-next');

  let items = [];
  let current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    const painting = items[current];

    image.src = painting.image;
    image.alt = `${painting.title} by Niko Pirosmani`;
    caption.textContent = painting.caption;
  }

  function open(list, index) {
    items = list;
    show(index);
    modal.classList.add('open');
    closeButton.focus();
  }

  function close() {
    modal.classList.remove('open');
  }

  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => show(current - 1));
  nextButton.addEventListener('click', () => show(current + 1));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;

    switch (event.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        show(current - 1);
        break;
      case 'ArrowRight':
        show(current + 1);
        break;
    }
  });

  return open;
}
