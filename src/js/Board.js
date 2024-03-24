import Cell from "./Cell";
import Hits from "./Hits";

export default class Board {
  constructor(element) {
    if(typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.hits = new Hits(this,".hits");

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
