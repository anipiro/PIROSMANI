const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getError(field) {
  const value = field.value.trim();

  if (value === '') {
    return 'This field is required.';
  }
  if (field.id === 'email' && !emailPattern.test(value)) {
    return 'Enter an email like name@example.com.';
  }
  if (field.id === 'message' && value.length < 10) {
    return 'Write at least 10 characters.';
  }
  return '';
}

function showError(field, text) {
  let error = field.parentElement.querySelector('.field-error');

  if (!error) {
    error = document.createElement('small');
    error.className = 'field-error';
    field.after(error);
  }

  error.textContent = text;
  field.classList.toggle('invalid', text !== '');
}

function checkField(field) {
  const error = getError(field);
  showError(field, error);
  return error === '';
}

function sendMessage() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

export function setupForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const counter = document.getElementById('counter');
  const status = document.getElementById('formMsg');
  const button = form.querySelector('button[type="submit"]');
  const fields = [nameInput, emailInput, messageInput];

  fields.forEach((field) => {
    field.addEventListener('blur', () => checkField(field));

    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) {
        checkField(field);
      }
    });
  });

  messageInput.addEventListener('input', () => {
    counter.textContent = `${messageInput.value.length} / ${messageInput.maxLength}`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = fields.map(checkField);

    if (results.includes(false)) {
      status.classList.add('error');
      status.textContent = 'Fix the highlighted fields and send again.';
      return;
    }

    const name = nameInput.value.trim();

    status.classList.remove('error');
    status.textContent = '';
    button.disabled = true;
    button.textContent = 'Sending…';

    sendMessage()
      .then(() => {
        status.textContent = `Thank you, ${name}. Your message has been sent.`;
        form.reset();
        counter.textContent = `0 / ${messageInput.maxLength}`;
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = 'Send message';
      });
  });
}
