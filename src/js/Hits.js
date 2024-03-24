export default class Hits {
  constructor(board, element) {
    this.board = board;
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.count = 0;
  }

  updateTitle() {
    this.element.textContent = `Попаданий ${this.count}`;
  }

  increment() {
    this.count += 1;
  }
}
