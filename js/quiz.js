const questions = [
  {
    text: 'What did Pirosmani usually paint on?',
    options: ['Stretched canvas', 'Black oilcloth', 'Wooden panels'],
    answer: 1,
  },
  {
    text: 'How did tavern owners often pay him?',
    options: [
      'With bread, wine and a bed',
      'With gold coins',
      'They never paid him',
    ],
    answer: 0,
  },
  {
    text: 'How do the animals in his paintings usually stand?',
    options: [
      'Running across the scene',
      'Hidden in tall grass',
      'Still, in profile',
    ],
    answer: 2,
  },
  {
    text: 'Which colors fill his palette?',
    options: [
      'Bright pinks and blues',
      'Ochres, deep reds and greens',
      'Soft pastel greys',
    ],
    answer: 1,
  },
];

class Quiz {
  #score = 0;
  #current = 0;

  constructor(questions, box) {
    this.questions = questions;
    this.box = box;
  }

  get finished() {
    return this.#current >= this.questions.length;
  }

  start() {
    this.#score = 0;
    this.#current = 0;
    this.showQuestion();
  }

  showQuestion() {
    const { text, options } = this.questions[this.#current];
    this.box.innerHTML = '';

    const step = document.createElement('p');
    step.className = 'quiz-step';
    step.textContent = `Question ${this.#current + 1} of ${this.questions.length}`;

    const title = document.createElement('h3');
    title.textContent = text;

    const list = document.createElement('div');
    list.className = 'quiz-options';

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.textContent = option;
      button.addEventListener('click', () => this.answer(index, list));
      list.append(button);
    });

    this.box.append(step, title, list);
  }

  answer(index, list) {
    const correct = this.questions[this.#current].answer;
    const buttons = list.querySelectorAll('button');

    buttons.forEach((button) => {
      button.disabled = true;
    });
    buttons[correct].classList.add('right');

    const feedback = document.createElement('p');
    feedback.className = 'quiz-feedback';

    if (index === correct) {
      this.#score++;
      feedback.textContent = 'Correct.';
    } else {
      buttons[index].classList.add('wrong');
      feedback.textContent = `Not quite. The answer is "${buttons[correct].textContent}".`;
    }

    this.#current++;

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'btn';
    next.textContent = this.finished ? 'See my result' : 'Next question';
    next.addEventListener('click', () => {
      if (this.finished) {
        this.showResult();
      } else {
        this.showQuestion();
      }
    });

    this.box.append(feedback, next);
    next.focus();
  }

  showResult() {
    this.box.innerHTML = '';

    const title = document.createElement('h3');
    title.textContent = `You got ${this.#score} of ${this.questions.length} right.`;

    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'btn';
    again.textContent = 'Try again';
    again.addEventListener('click', () => this.start());

    this.box.append(title, again);
    again.focus();
  }
}

export function setupQuiz() {
  const box = document.getElementById('quiz');
  if (!box) return;

  const quiz = new Quiz(questions, box);
  quiz.start();
}
