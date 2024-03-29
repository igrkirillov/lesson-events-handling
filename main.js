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
    element.addEventListener('mousedown', event => this.onCellClick(event));
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
  registerSuccess() {
    this.hits.incrementSuccess();
    nextStep(false);
  }
  registerSkip() {
    this.hits.incrementSkips();
    if (this.hits.skips >= 5) {
      alert(`Game over!`);
      this.hits.reset();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

let timeoutId;
let board;
const DURATION_FOR_HIT = 1000; //ms

document.addEventListener("DOMContentLoaded", () => {
  board = new Board(document.querySelector(".board"));
  startGame();
});
function startGame() {
  moveImg();
  timeoutId = setTimeout(nextStep, DURATION_FOR_HIT);
}
function nextStep(isByTimer = true) {
  clearTimeout(timeoutId);
  if (isByTimer) {
    board.registerSkip();
  }
  try {
    moveImg();
  } catch (e) {
    alert(e.message);
    return;
  }
  timeoutId = setTimeout(nextStep, DURATION_FOR_HIT);
}
function moveImg() {
  const img = document.querySelector(".cell img");
  if (!img) {
    throw new Error("Картинка не найдена! Игра остановлена!");
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