import Tower from './Tower';
import InventoryManager from 'managers/InventoryManager';

class BasicWall extends Tower {
    static get cost() {
        return 5;
    }
    static get sprite() {
        return 'basicWall';
    }
    static get name() {
        return 'Wall';
    }

    constructor(game, spawn, isCursor) {
        super(game, spawn, isCursor, BasicWall.sprite, 0);

        this.range = 0;
        this.rotateSpeed = 3;
    }

    update() {

    }
}

export default BasicWall;