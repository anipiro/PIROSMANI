export function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  const page = location.pathname.split('/').pop() || 'index.html';

  list.querySelectorAll('a').forEach((link) => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
}

export function setupToTop() {
  const button = document.getElementById('toTop');

  window.addEventListener('scroll', () => {
    button.classList.toggle('show', window.scrollY > 400);
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
