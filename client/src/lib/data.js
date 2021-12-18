export class Board {
  constructor() {
    this.data = Array(200).fill(0);
  }

  clone() {
    let newBoard = new Board();
    newBoard.data = this.data.slice();
    return newBoard;
  }

  isGameOver() {
    for (let i = 29; i >= 0; i--) {
      if (this.data[i] > 0) {
        return true;
      }
    }
    return false;
  }

  addPiece(piece) {
    let cells = piece.getCells();
    for (let i = 0; i < cells.length; i++) {
      this.data[cells[i]] = piece.id;
    }
  }

  //returns true if there are filled lines
  hasLines() {
    for (let r = 0; r < 20; r++) {
      let count = 0;
      for (let c = 0; c < 10; c++) {
        let i = r * 10 + c;
        count += this.data[i] !== 0 ? 1 : 0;
      }
      if (count === 10) return true;
    }
    return false;
  }

  //removes lines and
  removeLines() {

    let numLines = 0;

    for (let i = 199; i >= 0; i -= 10) {
      if (10 === this.data.slice(i - 9, i + 1).reduce((a, b) => a + (b > 0 ? 1 : 0), 0)) {
        numLines++;
        this.data.splice(i - 10, 10);
      }
    }

    for (let i = 0; i < numLines; i++) {
      this.data.unshift(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    return numLines;

  }


}

export class Piece {
  constructor(id) {
    this.id = id;
    this.rotation = 0;
    this.row = 0;
    this.col = 4;
    //Triangle
    if (id === 1) {
      this.positions = [[-1, 0, 1, 10], [-10, -1, 0, 10], [-10, -1, 0, 1], [-10, 0, 1, 10]];
      this.boundaries = [[-1, 1], [-1, 0], [-1, 1], [0, 1]];
    }
    //Square
    if (id === 2) {
      this.positions = [[0, 1, 10, 11]];
      this.boundaries = [[0, 1]];
    }
    //Line
    if (id === 3) {
      this.positions = [[-1, 0, 1, 2], [0, 10, 20, 30]];
      this.boundaries = [[-1, 2], [0, 0]];
    }

    //L
    if (id === 4) {
      this.positions = [[9, 10, 11, 19], [-1, 0, 10, 20], [1, 9, 10, 11], [0, 10, 20, 21]];
      this.boundaries = [[-1, 1], [-1, 0], [-1, 1], [0, 1]];
    }

    //J
    if (id === 5) {
      this.positions = [[9, 10, 11, 21], [0, 10, 19, 20], [-1, 9, 10, 11], [0, 1, 10, 20]];
      this.boundaries = [[-1, 1], [-1, 0], [-1, 1], [0, 1]];
    }

    //S
    if (id === 6) {
      this.positions = [[10, 11, 19, 20], [0, 10, 11, 21]];
      this.boundaries = [[-1, 1], [0, 1]];
    }

    //Z
    if (id === 7) {
      this.positions = [[9, 10, 20, 21], [1, 10, 11, 20]];
      this.boundaries = [[-1, 1], [0, 1]];
    }
  }

  clone() {
    let newPiece = new Piece(this.id);
    newPiece.rotation = this.rotation;
    newPiece.row = this.row;
    newPiece.col = this.col;
    newPiece.positions = this.positions.map(x => x.slice());
    newPiece.boundaries = this.boundaries.map(x => x.slice());
    return newPiece;
  }

  canMove(dir, board) {
    let cells = this.getCells();

    if (dir === 'left') {
      if (this.col + this.boundaries[this.rotation][0] === 0) return false;
      for (let i = 0; i < cells.length; i++) {
        if (board.data[cells[i] - 1] !== 0) return false;
      }
      return true;
    }
    if (dir === 'right') {
      if (this.col + this.boundaries[this.rotation][1] === 9) return false;
      for (let i = 0; i < cells.length; i++) {
        if (board.data[cells[i] + 1] !== 0) return false;
      }
      return true;
    }
    if (dir === 'down') {
      for (let i = 0; i < cells.length; i++) {
        if (board.data[cells[i] + 10] !== 0) return false;
      }
      return true;
    }
  }

  move(dir) {
    if (dir === 'down') this.row++;
    if (dir === 'left') this.col--;
    if (dir === 'right') this.col++;
  }

  canRotate(dir, board) {
    let test = this.clone();
    test.rotate(dir);

    //rotation would break left wall
    if (test.col + test.boundaries[test.rotation][0] < 0) {
      return false;
    }

    //rotation would break right wall
    if (test.col + test.boundaries[test.rotation][1] > 9) {
      return false;
    }

    let cells = test.getCells();
    for (let i = 0; i < cells.length; i++) {
      if (board.data[cells[i]] !== 0) {
        return false;
      }
    }
    return true;
  }

  rotate(dir) {
    if (dir === 'clockwise') {
      this.rotation = (this.rotation === this.positions.length - 1) ? 0 : this.rotation + 1;
    } else {
      this.rotation = (this.rotation === 0) ? this.positions.length - 1 : this.rotation - 1;
    }
  }

  isDone(board) {
    let cells = this.getCells();
    for (let i = 0; i < cells.length; i++) {
      if (board.data[cells[i] + 10] !== 0) return true;
      if (board.data[cells[i] + 10] >= 200) return true;
    }
    return false;
  }

  //returns an array of cells that the piece occupies
  getCells() {
    return this.positions[this.rotation].map(x => x + (this.row * 10 + this.col));
  }
}

