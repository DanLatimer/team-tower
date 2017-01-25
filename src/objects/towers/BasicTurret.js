import Tower from './Tower';
import InventoryManager from 'managers/InventoryManager';

class BasicTurret extends Tower {
    static get cost() {
        return 15;
    }
    static get sprite() {
        return 'basicTurret';
    }
    static get name() {
        return 'Turret';
    }

    constructor(game, spawn, isCursor) {
        super(game, spawn, isCursor, BasicTurret.sprite, 1);

        this.range = 150;
        this.rateOfFire = 1500;
        this.lastFire = new Date().getTime() + this.rateOfFire;
        
        this.animations.add('fire');
    }

    update() {
        this.attack();
    }
}

export default BasicTurret;