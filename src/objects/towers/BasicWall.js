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
        const damage = 0;
        const range = 0;
        const rateOfFire = 0;

        super(game, spawn, isCursor, BasicWall.sprite, damage, range, rateOfFire);

        this.range = 0;
    }
}

export default BasicWall;