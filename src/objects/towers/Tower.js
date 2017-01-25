import nn from 'nearest-neighbor';

class Tower extends Phaser.Sprite {
    static get cost() {
        throw {name : "NotImplementedError", message : "subclass must define this"}; 
    }
    static get sprite() {
        throw {name : "NotImplementedError", message : "subclass must define this"};
    }
    static get name() {
        throw {name : "NotImplementedError", message : "subclass must define this"};
    }

    constructor(game, spawn, isCursor, sprite, damage) {
        super(game, spawn.x, spawn.y, sprite);
        this.game = game;
        this.isCursor = isCursor;
        this.damage = damage;
        this.speed = 1;

        this.anchor.setTo(0.5, 0.5);

        if (isCursor) {
            this.alpha = 0.3;
        }

        this.game.stage.addChild(this);
    }

    update() {
        super.update(...arguments);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    sell() {
        this.game.inventoryManager.sell(this.constructor.cost);
    }

    attack() {
        if (this.damage && !this._shouldFire()) {
            return;
        }

        this.findNearestMinion((nearestMinion, distance) => {
            if (distance > this.range) {
                return;
            }

            this.game.audio.fx.shoot.play();
            this.animations.play('fire', 30);
            this.lastFire = new Date();
            nearestMinion.hit(this.damage);
        });
    }

    _shouldFire() {
        if (this.isCursor) {
            return false;
        }

        const elapsedTimeSinceLastFire = new Date().getTime() - this.lastFire;
        return elapsedTimeSinceLastFire > (this.rateOfFire / this.speed);
    }

    findNearestMinion(callback) {
        const comparators = [
            {name: "x", measure: nn.comparisonMethods.number, max: this.game.world.width},
            {name: "y", measure: nn.comparisonMethods.number, max: this.game.world.height}
        ];

        let minions = this.game.waveManager.getMinions();
        nn.findMostSimilar(this, minions, comparators, (nearestMinion, probability) => {
            if (!nearestMinion) {
                return;
            }

            let xDistance = this.centerX - nearestMinion.centerX;
            let yDistance = this.centerY - nearestMinion.centerY;
            let distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));

            callback(nearestMinion, distance);
        });
    }
}

export default Tower;