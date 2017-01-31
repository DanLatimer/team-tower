import Tower from 'objects/towers/Tower';

class InventoryItem {
    constructor(name, sprite, isAnimated, spriteFrames, cost, range = 0, rateOfFire = 0, damage = 0, hasSlowEffect) {
        this.name = name;
        this.sprite = sprite;
        this.cost = cost;
        this.range = range;
        this.rateOfFire = rateOfFire;
        this.damage = damage;
        this.isAnimated = isAnimated;
        this.spriteFrames = spriteFrames;
        this.hasSlowEffect = hasSlowEffect;
    }

    build(game, position, isCursor) {
        return new Tower(game, position, isCursor, this);
    }
}

class InventoryManager {

    static get Inventory() {
        return [
            new InventoryItem('Wall', 'basicWall', false, undefined, 5),
            new InventoryItem('Turret', 'basicTurret', true, undefined, 15, 150, 2500, 10), // dps = 10 / 2.500 = 4 ($15)
            new InventoryItem('Frost', 'ice_tower', true, [0,1,2,3,4,5,6,7,8,0], 25, 300, 10000, 30, true), // dps = 30 / 10 = 3 ($25 + slow) 
            new InventoryItem('Light', 'jaccobs_ladder', true, [0,1,2,3,4,5,0], 15, 75, 750, 4.5, false), // dps = 4.5 / 0.75 = 6 ($15 low range)
            new InventoryItem('Fire', 'fire_tower', true, [0,1,2,3,4,5,0], 150, 220, 750, 15, false), // dps = 15 / 0.75 = 20 ($150 medium-large range)
        ];
    };

    constructor(game) {
        this.game = game;
        this.lives = null;
        this.coins = null;
    }

    setup() {
        this.selectTower(InventoryManager.Inventory[0]);

        this.game.input.onUp.add(this.purchaseSelected, this);
    }

    update() {

    }

    destroy() {

    }

    sell(initialCost) {
        this.addCoins(initialCost * 0.5);
    }

    addCoins(coins) {
        this.coins += coins;
    }

    reduceLives() {
        this.lives -= 1;
        if (this.lives <= 0) {
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