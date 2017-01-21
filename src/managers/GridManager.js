var PF = require('pathfinding');

class GridManager {
    constructor(game) {
        this.game = game;
        
    }

    setup() {
        this.grid = new Grid(this.game);
        this.grid.draw();
    }

    update() {

    }
}

class Grid {
    constructor(game) {
        this.game = game;
        this.topLeft = {x: 100, y: 100};
        this.cellSize = 48;

        this.numberRows = 10;
        this.numberColumns = 12;

        this.grid = createArray(this.numberRows)
            .map((row, rowIndex) => createArray(this.numberColumns)
            .map((column, columnIndex) => new Cell(this.game, this.topLeft.x, this.topLeft.y, this.cellSize, rowIndex, columnIndex)));

        var grid = new PF.Grid(5, 3);
    }

    draw() {
        this.grid.forEach(row => row.forEach(cell => cell.draw()));
    }

    xyToGridCell(x, y) {
        var matchingCells = this._getCells().filter(cell => cell.contains(x, y));
        
        if (matchingCells > 1) {
            console.log('MORE THAN ONE CELL FOUND!');
        }

        return matchingCells.length ? matchingCells[0] : null;
    }

    _getCells() {
        return this.grid.reduce((rowA, rowB) => rowA.concat(rowB));
    }
}

class Cell {
    constructor(game, xOffset, yOffset, cellSize, row, column) {
        this.game = game;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.cellSize = cellSize;
        this.row = row;
        this.column = column;

        this.x = (this.column * this.cellSize) + this.xOffset;
        this.y = (this.row * this.cellSize) + this.yOffset; 
    }

    draw() {
        var graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(1, 0xffd900, 1);
        graphics.drawRect(this.x, this.y, this.cellSize, this.cellSize);
    }

    contains(x, y) {
        var withinX = x > this.x && x < this.x + this.cellSize;
        var withinY = y > this.y && y < this.y + this.cellSize;

        if (withinX && withinY) {
            console.log(`containing cell found: row ${this.row}, column ${this.column}`)
        }

        return withinX && withinY;
    }

    getCentroid() {
        var halfCellSize = this.cellSize / 2;
        return {
            x: this.x + halfCellSize,
            y: this.y + halfCellSize
        };
    }
}

function createArray(numberOfElements) {
    return new Array(numberOfElements).fill();
}

export default GridManager;