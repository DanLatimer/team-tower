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
        const damage = 1;
        const range = 150;
        const rateOfFire = 1500;

        super(game, spawn, isCursor, BasicTurret.sprite, damage, range, rateOfFire);
        
        this.animations.add('fire');
    }

    update() {
        this.attack();
    }
}

export default BasicTurret;