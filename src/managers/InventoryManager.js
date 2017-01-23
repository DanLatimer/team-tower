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
            name: "Wall",
            cost: 5
        };
    }

    static get BASIC_TURRET() {
        return {
            name: "Turret",
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
            if (!cell) {
                this.cursorView.visible = false;
                return;
            }

            if (this.cursorCellContent === cell.contents && cell.contents !== null) {
                return;
            }

            this.cursorCell = cell;
            this.cursorCellContent = cell.contents;

            if (cell.contents) {
                let blocker = this.getBlockerView(cell.contents.key, {x: 0, y: 0}, true);
                this.setCursor(blocker, true);
            } else {
                let path = this.game.gridManager.grid.findPath({row: 0, col: 0}, [{row: cell.row, col: cell.column}]);
                if (!path.length) {
                    this.cursorView.visible = false;
                    return;
                }
                let blocker = this.getSelectedBlockerView({x: 0, y: 0}, true);
                this.setCursor(blocker);
            }

            this.cursorView.visible = true;
            let location = cell.getCentroid();
            this.cursorView.move(location.x, location.y);
        });

        this.game.input.onUp.add(this.placeBlocker, this);
    }

    update() {

    }

    sell(blocker) {
        const sellPrice = blocker.type.cost * 0.5;
        this.addCoins(sellPrice);
    }

    addCoins(coins) {
        this.coins += coins;
    }

    reduceHealth() {
        this.health -= 1;
        if (this.health <= 0) {
            this.setCursor();
            this.game.state.states['GameState'].destroy();
            this.game.state.states['GameOverState'].win = false;
            this.game.state.start('GameOverState');
            console.log("You died!");
        }
    }

    selectBlocker(item_type) {
        this.selectedBlocker = item_type;
        let blocker = this.getSelectedBlockerView({x: 0, y: 0}, true);

        this.setCursor(blocker);
        this.cursorView.visible = false;
    }

    setCursor(blocker, purchased) {
        if (this.cursorView) {
            this.cursorView.destroy();
        }

        if (!blocker) {
            return;
        }

        const cell = this.game.gridManager.grid.getCellCursorIsOver();
        const wrappedCursorView = new RangedBlockerCursor(this.game, blocker, cell, purchased);

        this.cursorView = wrappedCursorView;
    }

    placeBlocker() {
        let cell = this.getGridCellFromPosition(this.game.input.activePointer);
        if (!cell) {
            return;
        }
        if (cell.contents) {
            return;
        }
        let path = this.game.gridManager.grid.findPath({row: 0, col: 0}, [{row: cell.row, col: cell.column}]);
        if (!path.length) {
            return;
        }
        let item = this.inventory[this.selectedBlocker];
        if (item.cost <= this.coins) {
            this.coins -= item.cost;
            let blocker = this.getSelectedBlockerView(cell.getCentroid());
            cell.contents = blocker;
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