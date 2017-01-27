import Market from '../objects/ui/Market';
import HUD from '../objects/ui/HUD';
import RangedBlockerCursor from '../objects/RangedBlockerCursor';

class CursorManager {

    constructor(game) {
        this.game = game;
    }

    setup() {
        this.game.input.addMoveCallback(this._onCursorMove, this);
    }

    update() {

    }

    destroy() {

    }

    _onCursorMove(pointer, x, y) {
        if (!pointer || !pointer.withinGame) { return; }

        let cell = this.game.gridManager.grid.xyToGridCell(x, y);
        const isWithinGrid = Boolean(cell);
        if (!isWithinGrid) {
            this._setVisibility(false);
            return;
        }

        if (this._isCursorAlreadyRendered(cell)) {
            return;
        }
        this.cursorCellContent = cell.contents;

        if (cell.contents) {
            this._setCursorToCellContentsInfo(cell);
            return;
        } 

        if (!this.game.inventoryManager.canPurchaseSelected(cell)) {
            this._setVisibility(false);
            return;
        }

        this._setCursorToSelectedTowerForPurchase(cell);
    }

    _setVisibility(visible) {
        if (!this.cursor) {
            return;
        }

        this.cursor.visible = visible;
    }

    updateCursor() {
        const {x, y} = this.game.input.activePointer;
        this._onCursorMove(null, x, y);
    }

    _setCursorToCellContentsInfo(cell) {
        const towerCursor = new cell.contents.inventoryItem.build(this.game, {x: 0, y: 0}, false);

        this.setCursor(new RangedBlockerCursor(this.game, towerCursor, cell, true));
        this._updateCursorLocation();        
    }

    _isCursorAlreadyRendered(cell) {
        return this.cursorCellContent === cell.contents && cell.contents !== null;
    }

    _setCursorToSelectedTowerForPurchase(cell) {
        const inventoryItem = this.game.inventoryManager.getSelectedInventoryItem();
        const towerCursor = inventoryItem.build(this.game, {x: 0, y: 0}, true); 

        this.setCursor(new RangedBlockerCursor(this.game, towerCursor, cell, false));
        this._updateCursorLocation();
    }

    _updateCursorLocation() {
        if (!this.cursor) {
            return;
        }

        const cell = this.game.gridManager.grid.getCellCursorIsOver();
        if (!cell) {
            return;
        }

        this._setVisibility(true);
        let location = cell.getCentroid();

        this.cursor.move(location.x, location.y);
    }

    setCursor(cursor) {
        if (this.cursor) {
            this.cursor.destroy();
        }

        if (!cursor) {
            this.cursor = null;
            return;
        }

        this.cursor = cursor;
    }

    clearCursor() {
        this.setCursor();
    }
}

export default CursorManager;






