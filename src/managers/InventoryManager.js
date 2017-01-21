import BasicTurret from 'objects/BasicTurret';

class InventoryManager {

    constructor(game) {
        this.game = game;
    }

    setup() {
        this.selectedBlocker = new BasicTurret(this.game, {x: 0, y: 0});

        this.game.input.addMoveCallback((pointer, x, y) => {  
            if (!this.selectedBlocker) {
                return;
            }

            var cell = this.game.gridManager.grid.xyToGridCell(x, y);
            var location = cell ? cell.getCentroid() : {x, y};
            this.selectedBlocker.move(location.x, location.y);
        });
    }

    update() {

    }
}

export default InventoryManager;