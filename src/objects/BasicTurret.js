import nn from 'nearest-neighbor';

class BasicTurret extends Phaser.Sprite {

	constructor(game, spawn, isCursor) {
		super(game, spawn.x, spawn.y, 'basicTurret');
		this.game = game;
		this.isCursor = isCursor;

		this.anchor.setTo(0.5, 0.5);
		this.range = 150;
		this.rateOfFire = 3000;
		this.lastFire = Date.now();
		this.game.stage.addChild(this);
	}

	update() {
		this.attack();
	}

	move(x, y) {
		this.x = x;
		this.y = y;
	}

	attack() {
        const now = Date.now();
        if (this.isCursor || (now - this.lastFire) < this.rateOfFire) {
            return;
        }
        let minions = this.game.waveManager.getMinions();
        nn.findMostSimilar(this, minions, [
            {name: "x", measure: nn.comparisonMethods.number, max: this.game.world.length},
            {name: "y", measure: nn.comparisonMethods.number, max: this.game.world.height}
        ], (nearestNeighbor, probability) => {
            if (!nearestNeighbor) {
                return;
            }
            console.log(nearestNeighbor);
            console.log(probability);
            let a = this.centerX - nearestNeighbor.centerX;
            let b = this.centerY - nearestNeighbor.centerY;

            let c = Math.sqrt((a * a) + (b * b));
            if (c < this.range) {
                this.lastFire = now;
                const dead = nearestNeighbor.hit();
                if (dead) {
                    this.game.waveManager.removeMinion(nearestNeighbor);
                }
            }
        });
	}
}

export default BasicTurret;