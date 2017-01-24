import Tower from './Tower';
import InventoryManager from 'managers/InventoryManager';

class BasicWall extends Tower {
    constructor(game, spawn, isCursor) {
        super(game, spawn, isCursor, 'basicWall');

        this.rotateSpeed = 3;

        this.type = InventoryManager.BASIC_WALL;
    }

    update() {

    }

    sell() {
        this.InventoryManager.sell(this, this.type);
    }
}

export default BasicWall;