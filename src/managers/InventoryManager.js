import BasicWall from 'objects/towers/BasicWall';
import BasicTurret from 'objects/towers/BasicTurret';

class InventoryManager {

    static get Inventory() {
        return [BasicTurret, BasicWall];
    };

    constructor(game) {
        this.game = game;
    }

    setup(initialHealth, initialCoins) {
        this.health = initialHealth;
        this.coins = initialCoins;

        this.selectTower(BasicWall);

        this.game.input.onUp.add(this.purchaseSelected, this);
    }

    update() {

    }

    sell(initialCost) {
        this.addCoins(initialCost * 0.5);
    }

    addCoins(coins) {
        this.coins += coins;
    }

    reduceHealth() {
        this.health -= 1;
        if (this.health <= 0) {
            this.game.cursorManager.clearCursor();
            this.game.state.states['GameState'].destroy();
            this.game.state.states['GameOverState'].win = false;
            this.game.state.start('GameOverState');
            console.log("You died!");
        }
    }

    selectTower(towerClass) {
        this.selectedTowerClass = towerClass;
        this.game.cursorManager.updateCursor();        
    }

    getSelectedTowerClass() {
        return this.selectedTowerClass;
    }

    purchaseSelected(pointer) {
        if (!pointer.withinGame) { return; }

        let cell = this.game.gridManager.grid.positionToGridCell(pointer);
        if (!cell || cell.contents) {
            return;
        }
        
        if (!this._pathExistsToExit(cell)) {
            return;
        }

        var cost = this.selectedTowerClass.cost;
        if (cost > this.coins) {
            return;
        }

        this.coins -= cost;

        cell.contents = new this.selectedTowerClass(this.game, cell.getCentroid(), false);
        this.game.audioManager.playSoundEffect('construction', 'build');
    }

    _pathExistsToExit(cell) {
        let path = this.game.gridManager.grid.findPath({
                row: 0, 
                col: 0
            }, [{
                row: cell.row, 
                col: cell.column
            }]);
        return path.length;
    }

    canPurchaseSelected(cell) {
        const path = this.game.gridManager.grid.findPath({row: 0, col: 0}, [{row: cell.row, col: cell.column}]);
        return path.length;
    }
}

export default InventoryManager;