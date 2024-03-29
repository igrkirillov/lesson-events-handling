import Board from "./Board";

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

export function nextStep(isByTimer = true) {
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
