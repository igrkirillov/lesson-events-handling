/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/cursors.js
const cursors = {
  auto: 'auto',
  pointer: 'pointer',
  crosshair: 'crosshair',
  notallowed: 'not-allowed'
};
/* harmony default export */ const js_cursors = (cursors);
;// CONCATENATED MODULE: ./src/js/Cell.js

class Cell {
  constructor(board, element) {
    this.board = board;
    if (typeof element === 'string') {
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
      this.board.incrementHits();
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
    this.element.style.cursor = js_cursors.crosshair;
  }
  setCursorDefault() {
    this.element.style.cursor = null;
  }
}
;// CONCATENATED MODULE: ./src/js/Hits.js
class Hits {
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
;// CONCATENATED MODULE: ./src/js/Board.js


class Board {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.hits = new Hits(this, ".hits");
    this.cells = [];
    for (const cellElement of element.querySelectorAll(".cell")) {
      this.cells.push(new Cell(this, cellElement));
    }
  }
  incrementHits() {
    this.hits.increment();
    this.hits.updateTitle();
    if (this.hits.count >= 5) {
      alert(`Победа! Попаданий ${this.hits.count}`);
      this.hits.count = 0;
      this.hits.updateTitle();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

let intervalId;
let board;
document.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(moveImg, 1000);
  board = new Board(document.querySelector(".board"));
});
function moveImg() {
  const img = document.querySelector(".cell img");
  if (!img) {
    clearInterval(intervalId);
    alert("Картинка не найдена! Игра остановлена!");
    return;
  }
  const oldCell = img.parentElement;
  const newCell = getNextCell(oldCell);
  oldCell.replaceChildren();
  newCell.replaceChildren(img);
}
function getNextCell(currentCell) {
  const cells = document.querySelectorAll(".cell");
  let nextCell = currentCell;
  while (nextCell === currentCell) {
    let index = Math.trunc(Math.random() * cells.length);
    nextCell = cells[index];
  }
  return nextCell;
}
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;