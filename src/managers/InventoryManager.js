import BasicWall from 'objects/BasicWall';
import BasicTurret from 'objects/BasicTurret';
import RangedBlockerCursor from 'objects/RangedBlockerCursor';

class InventoryManager {

    static get BLOCKER_TYPES() {
        return {
            BASIC_WALL: 'basicWall',
            BASIC_TURRET: 'basicTurret'
        };
    }

    static get BASIC_WALL() {
        return {
            cost: 5
        };
    }

    static get BASIC_TURRET() {
        return {
            cost: 15
        };
    }

    constructor(game) {
        this.game = game;
    }

    setup(initialHealth, initialCoins) {
        this.health = initialHealth;
        this.coins = initialCoins;

        this.inventory = {};

        this.inventory[InventoryManager.BLOCKER_TYPES.BASIC_WALL] = InventoryManager.BASIC_WALL;
        this.inventory[InventoryManager.BLOCKER_TYPES.BASIC_TURRET] = InventoryManager.BASIC_TURRET;

        this.selectBlocker(InventoryManager.BLOCKER_TYPES.BASIC_WALL);

        this.game.input.addMoveCallback((pointer, x, y) => {
            if (!this.cursorView) {
                return;
            }

            let cell = this.getGridCellFromPosition({x, y});
            if (!cell || (cell.contents && cell.contents.key != InventoryManager.BLOCKER_TYPES.BASIC_TURRET)) {
                this.cursorView.visible = false;
                return;
            }
            if (cell.contents) {
                let blocker = this.getBlockerView(cell.contents.key, {x: 0, y: 0}, true);
                this.setCursor(blocker, true);
            } else {
                let blocker = this.getSelectedBlockerView({x: 0, y: 0}, true);
                this.setCursor(blocker);
            }
            this.cursorView.visible = true;
            let location = cell.getCentroid();
            this.cursorView.move(location.x, location.y);
        });

        this.game.input.onUp.add(this.placeBlocker, this);
    }

    _buyBasicTurret() {
        var {x, y} = this.game.input.activePointer;
        console.log(`clicked ${x}, ${y}`);
        
        let cell = this.game.gridManager.grid.xyToGridCell(x, y);
        if (!cell) {
            return;
        }

        var turret = new BasicTurret(this.game, cell.getCentroid());
        cell.contents = turret;
        this.game.gridManager.grid.draw(); 
    }

    update() {

    }

    addCoins(coins) {
        this.coins += coins;
    }

    reduceHealth() {
        this.health -= 1;
        if (this.health <= 0) {
            console.log("You died!");
        }
    }

    selectBlocker(item_type) {
        this.selectedBlocker = item_type;
        let blocker = this.getSelectedBlockerView({x: 0, y: 0}, true);
        this.setCursor(blocker);
    }

    setCursor(blocker, purchased) {
        if (this.cursorView) {
            this.cursorView.destroy();
        }
        if (blocker.range) {
            blocker = new RangedBlockerCursor(this.game, blocker, purchased);
        }
        this.cursorView = blocker;
    }

    placeBlocker() {
        let cell = this.getGridCellFromPosition(this.game.input.activePointer);
        if (!cell) {
            return;
        }
        if (cell.contents) {
            return;
        }
        let item = this.inventory[this.selectedBlocker];
        if (item.cost <= this.coins) {
            this.coins -= item.cost;
            let blocker = this.getSelectedBlockerView(cell.getCentroid());
            cell.contents = blocker;
            this.game.gridManager.grid.draw();
            return true;
        }
        return false;
    }

    getGridCellFromPosition(position) {
        return this.game.gridManager.grid.xyToGridCell(position.x, position.y);
    }

    getSelectedBlockerView(position, isCursor) {
        return this.getBlockerView(this.selectedBlocker, position, isCursor);
    }

    getBlockerView(type, position, isCursor) {
            switch (type) {
            case InventoryManager.BLOCKER_TYPES.BASIC_WALL:
                return new BasicWall(this.game, position, isCursor);
            case InventoryManager.BLOCKER_TYPES.BASIC_TURRET:
                return new BasicTurret(this.game, position, isCursor);
            default:
                console.log(`unexpected item_type: ${this.selectedBlocker}`);
        }
    }
}

export default InventoryManager;