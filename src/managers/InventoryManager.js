import BasicWall from 'objects/BasicWall';
import BasicTurret from 'objects/BasicTurret';

class InventoryManager {

    static get BLOCKER_TYPES() {
        return {
            BASIC_WALL: 'basicWall',
            BASIC_TURRET: 'basicTurret'
        };
    }

    static get BASIC_WALL() {
        return {
            cost: 1
        };
    }

    static get BASIC_TURRET() {
        return {
            cost: 5
        };
    }

    constructor(game) {
       this.game = game;
    }

    setup(initialCoins) {
        this.coins = initialCoins;

        this.inventory = {};

        this.inventory[InventoryManager.BLOCKER_TYPES.BASIC_WALL] = InventoryManager.BASIC_WALL;
        this.inventory[InventoryManager.BLOCKER_TYPES.BASIC_TURRET] = InventoryManager.BASIC_TURRET;

        this.selectBlocker(InventoryManager.BLOCKER_TYPES.BASIC_WALL);

        this.game.input.addMoveCallback((pointer, x, y) => {  
            if (!this.cursorView) {
                return;
            }

            let cell = this.game.gridManager.grid.xyToGridCell(x, y);
            if (!cell) {
                this.cursorView.visible = false;
                return;
            }
            this.cursorView.visible = true;
            let location = cell.getCentroid();
            this.cursorView.move(location.x, location.y);
        });

        this.game.input.onUp.add(this.placeBlocker, this);
    }

    update() {

    }

    selectBlocker(item_type) {
        this.selectedBlocker = item_type;
        this.cursorView = this.getSelectedBlockerView({x: 0, y: 0})
    }

    placeBlocker() {
        let position = this.game.input.activePointer;
        console.log(`clicked ${position.x}, ${position.y}`);
        let cell = this.game.gridManager.grid.xyToGridCell(position.x, position.y);
        if (!cell) {
            return;
        }
        let location = cell.getCentroid();
        let item = this.inventory[this.selectedBlocker];
        if (item.cost <= this.coins) {
            this.coins -= item.cost;
            this.getSelectedBlockerView(location);
            return true;
        }
        return false;
    }

    getSelectedBlockerView(position) {
        switch (this.selectedBlocker) {
            case InventoryManager.BLOCKER_TYPES.BASIC_WALL:
                return new BasicWall(this.game, position);
            case InventoryManager.BLOCKER_TYPES.BASIC_TURRET:
                return new BasicTurret(this.game, position);
            default:
                console.log(`unexpected item_type: ${this.selectedBlocker}`);
        }
    }
}

export default InventoryManager;