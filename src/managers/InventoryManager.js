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

            let cell = this.getGridCellFromPosition(this.game.input.activePointer);
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

    selectBlocker(item_type) {
        this.selectedBlocker = item_type;
        if (this.cursorView) {
            this.cursorView.destroy();
        }
        this.cursorView = this.getSelectedBlockerView({x: 0, y: 0})
    }

    placeBlocker() {
        let cell = this.getGridCellFromPosition(this.game.input.activePointer);
        if (!cell) {
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