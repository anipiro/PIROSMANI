export default class Painting {
  constructor(data) {
    this.title = data.title;
    this.image = data.image;
    this.category = data.category;
    this.details = data.details;
    this.about = data.about;
  }

  get caption() {
    return `${this.title} — ${this.details}`;
  }

  isIn(category) {
    return category === 'all' || this.category === category;
  }

  matches(text) {
    return this.title.toLowerCase().includes(text.toLowerCase());
  }

  static async loadAll() {
    const response = await fetch('data/paintings.json');

    if (!response.ok) {
      throw new Error(`Could not load paintings: ${response.status}`);
    }

    const list = await response.json();
    return list.map((item) => new Painting(item));
  }
}
