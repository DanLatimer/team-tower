import PF from 'pathfinding';

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
    }

    draw() {
        let path = this.findPath({row: 0, col: 0})
        this._getCells().forEach(cell => cell.isWalkPath = false);
        path.forEach(pathCell => this.getCell(pathCell).isWalkPath = true);

        this.grid.forEach(row => row.forEach(cell => cell.draw()));
    }

    getCell(cellLocationArray) {
        return this.grid[cellLocationArray[1]][cellLocationArray[0]];
    }

    findPath(startLocation) {
        let exitCell = this.getExitCell();
        let matrix = this._toWalkableMatrix(); 
        let grid = new PF.Grid(matrix);
        let finder = new PF.BiDijkstraFinder();//new PF.AStarFinder();
        return finder.findPath(startLocation.col, startLocation.row, exitCell.column, exitCell.row, grid);
    }

    getExitCell() {
        return this.grid[this.numberRows - 1][this.numberColumns - 1];
    }

    _toWalkableMatrix() {
        return this.grid.map(row => row.map(cell => cell.isBlocker() ? 1 : 0))
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
        this.contents = null;
        this.isWalkPath = false;

        this.x = (this.column * this.cellSize) + this.xOffset;
        this.y = (this.row * this.cellSize) + this.yOffset; 
    }

    equals(otherCell) {
        return this.row === otherCell.row && this.column === otherCell.column;
    }

    draw() {
        var graphics = this.game.add.graphics(0, 0);
        let colour = this.isWalkPath ? 0x42f474 : 0xffd900;
        graphics.lineStyle(1, colour, 1);
        graphics.beginFill(0xffffff);
        graphics.drawRect(this.x, this.y, this.cellSize, this.cellSize);
    }

    contains(x, y) {
        var withinX = x >= this.x && x < this.x + this.cellSize;
        var withinY = y >= this.y && y < this.y + this.cellSize;

        return withinX && withinY;
    }

    getCentroid() {
        var halfCellSize = this.cellSize / 2;
        return {
            x: this.x + halfCellSize,
            y: this.y + halfCellSize
        };
    }

    isBlocker() {
        return this.contents != null;
    }
}

function createArray(numberOfElements) {
    return new Array(numberOfElements).fill();
}

export default GridManager;