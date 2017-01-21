import PF from 'pathfinding';
import BasicWall from '../objects/BasicWall';

class GridManager {
    constructor(game) {
        this.game = game;
    }

    setup() {
        this.grid = new Grid(this.game);
        this.grid.draw();

        let first = this.grid.grid[4][5].getCentroid();
        let second = this.grid.grid[2][8].getCentroid();
        let third = this.grid.grid[3][10].getCentroid();
        let fourth = this.grid.grid[9][4].getCentroid();
        let fifth = this.grid.grid[6][1].getCentroid();

        this.minions = [
            new BasicWall(this.game, first),
            new BasicWall(this.game, second),
            new BasicWall(this.game, third),
            new BasicWall(this.game, fourth),
            new BasicWall(this.game, fifth)
        ]
    }

    update() {

    }

    getMinions() {
       return this.minions;
    }

    removeMinion(minion) {
        this.minions = this.minions.filter((m) => { return (m != minion) });
        minion.destroy();
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
        let matrix = this._toWalkableMatrix(); 
        let grid = new PF.Grid(matrix);
        let finder = new PF.AStarFinder();
        let path = finder.findPath(0, 0, this.numberColumns - 1, this.numberRows - 1, grid);
        this._getCells().forEach(cell => cell.isWalkPath = false);
        path.forEach(pathCell => this.grid[pathCell[1]][pathCell[0]].isWalkPath = true);

        this.grid.forEach(row => row.forEach(cell => cell.draw()));
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

    draw() {
        var graphics = this.game.add.graphics(0, 0);
        let colour = this.isWalkPath ? 0x42f474 : 0xffd900;
        graphics.lineStyle(1, colour, 1);
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

    isBlocker() {
        return this.contents != null;
    }
}

function createArray(numberOfElements) {
    return new Array(numberOfElements).fill();
}

export default GridManager;