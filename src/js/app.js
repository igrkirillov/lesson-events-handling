let intervalId;

document.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(moveImg, 1000);
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
