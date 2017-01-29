import {HealthBar} from '../HealthBar';

class Minion extends Phaser.Sprite {
    constructor(game, spawn, sprite, health) {
        super(game, spawn.x, spawn.y, sprite);
        this.game = game;

        this.anchor.setTo(0.5, 0.5);
        this.game.stage.addChild(this);

        this.x = spawn.x;
        this.y = spawn.y;
        this.lastMoved = new Date();
        this.initialHealth = Number(health); 
        this.health = Number(health);
        this.speed = 1;
        this.isSlowed = false;

        this.myHealthBar = new HealthBar(this.game, {
            x: this.x - 20, 
            y: this.y - 20, 
            width: this.width,
            height: 10,
            bar: {
                color: '#24ad2d'
            }
        });
    }

    update() {
        if (this.game.waveManager.paused) {
            return;
        }
        let {grid} = this.game.gridManager;

        let currentCell = grid.xyToGridCell(this.x, this.y);
        let exitCell = grid.getExitCell();
        if (currentCell.equals(exitCell)) {
            console.log("MinorMinion escaped!");
            this.game.inventoryManager.reduceHealth();
            this.kill();
            return;
        }

        let path = grid.findPath({row: currentCell.row, col: currentCell.column});
        if (!path) {
            console.log('MinorMinion blocked');
            this.kill();
            return;
        }

        let lengthToWalk = this._calculateDistanceToMove();
        const firstCell = grid.getCell(path[0]);
        const firstWaypoint = firstCell.getCentroid();
        let nextWaypointIndex = 1;

        while (lengthToWalk > 0) {
            let nextCell = grid.getCell(path[nextWaypointIndex]);
            let nextWaypoint = nextCell.getCentroid();

            var distanceToNextWaypoint = this._getDistance(
                {x: this.x, y: this.y},
                nextWaypoint);

            if (lengthToWalk >= distanceToNextWaypoint) {
                lengthToWalk -= distanceToNextWaypoint;
                this._move(nextWaypoint.x, nextWaypoint.y);
                nextWaypointIndex++;
            } else {
                let percentThere = lengthToWalk / distanceToNextWaypoint;
                let additionalX = (nextWaypoint.x - this.x) * percentThere;
                let additionalY = (nextWaypoint.y - this.y) * percentThere;
                this._move(this.x + additionalX, this.y + additionalY);
                lengthToWalk = 0;
            }
        }
    }

    applySlowEffect() {
        this.isSlowed = true;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    _move(x, y) {
        this.x = x;
        this.y = y;
        this.myHealthBar.setPosition(this.x, this.y - 20);
    }

    hit() {
        this.health -= 1;
        this.myHealthBar.setPercent(this.health / this.initialHealth * 100);

        if (this.health <= 0) {
            this.game.inventoryManager.addCoins(this.bounty);
            this.kill();
        }
    }

    kill() {
        this.game.audioManager.playSoundEffect('explode');
        this.game.waveManager.removeMinion(this);
        this.myHealthBar.kill();
    }

    _getDistance(pointA, pointB) {
        let AB = Math.abs(pointB.x - pointA.x);
        let BC = Math.abs(pointB.y - pointA.y);
        return Math.sqrt(Math.pow(AB, 2) + Math.pow(BC, 2));
    }

    _calculateDistanceToMove() {
        let currentTime = new Date();
        let millisSinceLastMoved = currentTime - this.lastMoved;
        this.lastMoved = currentTime;

        const slowedFactor = this.isSlowed ? 0.45 : 1;

        return this.pixelsPerSecond * this.speed * (millisSinceLastMoved / 1000) * slowedFactor;
    }
}

export default Minion;