import cursors from "./cursors";

export default class Cell {
  constructor(board, element) {
    this.board = board;
    if(typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;

    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellMouseMove = this.onCellMouseMove.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.onCellClick = this.onCellClick.bind(this);

    element.addEventListener('mouseenter', event => this.onCellEnter(event));
    element.addEventListener('mouseover', event => this.onCellMouseMove(event));
    element.addEventListener('mouseleave', event => this.onCellLeave(event));
    element.addEventListener('click', event => this.onCellClick(event));
  }

  onCellEnter(event) {
    this.setCursor();
  }

  onCellMouseMove(event) {
    this.setCursor();
  }

  onCellLeave(event) {
    this.setCursor();
  }

  onCellClick(event) {
    if (this.isContainGoblin()) {
      this.board.registerSuccess();
    }
  }

  setCursor() {
    if (this.isContainGoblin()) {
      this.setCursorCross();
    } else {
      this.setCursorDefault();
    }
  }

  isContainGoblin() {
    return !!this.element.querySelector("img");
  }

  setCursorCross() {
    this.element.style.cursor = cursors.crosshair;
  }

  setCursorDefault() {
    this.element.style.cursor = null;
  }
}
