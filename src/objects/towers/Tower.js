import nn from 'nearest-neighbor';

class Tower extends Phaser.Sprite {
    constructor(game, spawn, isCursor, inventoryItem) {
        super(game, spawn.x, spawn.y, inventoryItem.sprite);
        this.game = game;
        this.isCursor = isCursor;
        this.inventoryItem = inventoryItem;
        this.damage = inventoryItem.damage;
        this.range = inventoryItem.range;
        this.rateOfFire = inventoryItem.rateOfFire;
        this.cost = inventoryItem.cost;
        this.name = inventoryItem.name;
        this.isAnimated = inventoryItem.isAnimated;

        this.speed = 1;
        this.lastFire = new Date().getTime() + 1500;
        this.alpha = isCursor ? 0.3 : 1;

        if (this.isAnimated) {
            this.animations.add('fire');    
        }
        
        this.anchor.setTo(0.5, 0.5);
        this.game.stage.addChild(this); 
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
        this.game.inventoryManager.sell(this.inventoryItem.cost);
    }

    attack() {
        if (this.damage && !this._shouldFire()) {
            return;
        }

        this._findNearestMinion((nearestMinion, distance) => {
            if (!this._shouldFire() || distance > this.range) {
                return;
            }

            this.game.audioManager.playSoundEffect('shoot');
            if (this.isAnimated) {
                this.animations.play('fire', 30);    
            }
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

    _findNearestMinion(callback) {
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