export default class Hits {
  constructor(board, element) {
    this.board = board;
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.successes = 0;
    this.skips = 0;
    this.updateTitle();
  }

  updateTitle() {
    this.element.textContent = `Попаданий ${this.successes} Пропусков ${this.skips}`;
  }

  incrementSuccess() {
    this.successes += 1;
    this.updateTitle();
  }

  incrementSkips() {
    this.skips += 1;
    this.updateTitle();
  }

  reset() {
    this.successes = 0;
    this.skips = 0;
    this.updateTitle();
  }
}
