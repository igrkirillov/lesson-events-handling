import Cell from "./Cell";
import Hits from "./Hits";
import {nextStep} from "./app";

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
