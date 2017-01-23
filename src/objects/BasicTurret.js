import nn from 'nearest-neighbor';
import InventoryManager from 'managers/InventoryManager';

class BasicTurret extends Phaser.Sprite {
	constructor(game, spawn, isCursor) {
		super(game, spawn.x, spawn.y, 'basicTurret');
		this.game = game;
		this.isCursor = isCursor;

		this.anchor.setTo(0.5, 0.5);
		this.range = 150;
		this.rateOfFire = 1500;
		this.lastFire = new Date().getTime() + this.rateOfFire;
		this.game.stage.addChild(this);
        this.speed = 1;
        this.animations.add('fire');
        this.type = InventoryManager.BASIC_TURRET;

        if (isCursor) {
            this.alpha = 0.3;
        }
    }

	update() {
		this.attack();
	}

	move(x, y) {
		this.x = x;
		this.y = y;
	}

    setSpeed(speed) {
        this.speed = speed;
    }

    sell() {
        this.game.inventoryManager.sell(this, this.type);
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