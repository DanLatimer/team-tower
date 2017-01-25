import Tower from './Tower';
import nn from 'nearest-neighbor';
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
        super(game, spawn, isCursor, BasicTurret.sprite);

        this.range = 150;
        this.rateOfFire = 1500;
        this.lastFire = new Date().getTime() + this.rateOfFire;
        
        this.animations.add('fire');
    }

    update() {
        this.attack();
    }

    attack() {
        const now = Date.now();
        if (!this._shouldFire()) {
            return;
        }

        let minions = this.game.waveManager.getMinions();
        nn.findMostSimilar(this, minions, [
            {name: "x", measure: nn.comparisonMethods.number, max: this.game.world.width},
            {name: "y", measure: nn.comparisonMethods.number, max: this.game.world.height}
        ], (nearestNeighbor, probability) => {
            if (!nearestNeighbor) {
                return;
            }

            let a = this.centerX - nearestNeighbor.centerX;
            let b = this.centerY - nearestNeighbor.centerY;

            let c = Math.sqrt((a * a) + (b * b));
            if (c < this.range) {
                this.game.audio.fx.shoot.play();
                this.animations.play('fire', 30);
                this.lastFire = new Date();
                nearestNeighbor.hit();
            }
        });
    }

    _shouldFire() {
        if (this.isCursor) {
            return false;
        }

        const elapsedTimeSinceLastFire = new Date().getTime() - this.lastFire;
        return elapsedTimeSinceLastFire > (this.rateOfFire / this.speed);
    }
}

export default BasicTurret;