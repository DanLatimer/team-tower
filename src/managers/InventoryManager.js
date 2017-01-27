import Tower from 'objects/towers/Tower';

class InventoryItem {
    constructor(name, sprite, isAnimated, cost, range = 0, rateOfFire = 0, damage = 0) {
        this.name = name;
        this.sprite = sprite;
        this.cost = cost;
        this.range = range;
        this.rateOfFire = rateOfFire;
        this.damage = damage;
        this.isAnimated = isAnimated;
    }

    build(game, position, isCursor) {
        return new Tower(game, position, isCursor, this);
    }
}

class InventoryManager {

    static get Inventory() {
        return [
            new InventoryItem('Wall', 'basicWall', false, 5),
            new InventoryItem('Turret', 'basicTurret', true, 15, 150, 2500, 1)
        ];
    };

    constructor(game) {
        this.game = game;
    }

    setup(initialHealth, initialCoins) {
        this.health = initialHealth;
        this.coins = initialCoins;

        this.selectTower(InventoryManager.Inventory[0]);

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

    selectTower(inventoryItem) {
        this.selectedinventoryItem = inventoryItem;
        this.game.cursorManager.updateCursor();        
    }

    getSelectedInventoryItem() {
        return this.selectedinventoryItem;
    }

    purchaseSelected(pointer) {
        if (!pointer.withinGame) { return; }

        let cell = this.game.gridManager.grid.positionToGridCell(pointer);
        if (!cell || cell.contents) {
            return;
        }
        
        if (!this.canPurchaseSelected(cell)) {
            return;
        }

        var cost = this.selectedinventoryItem.cost;
        if (cost > this.coins) {
            return;
        }

        this.coins -= cost;

        cell.contents = this.selectedinventoryItem.build(this.game, cell.getCentroid(), false);

        this.game.audioManager.playSoundEffect('construction', 'build');
    }

    canPurchaseSelected(cell) {
        const path = this.game.gridManager.grid.findPath(
            {row: 0, col: 0},
            [
                {row: cell.row, col: cell.column}
            ]
        );
        return path.length;
    }
}

export default InventoryManager;