class MinorMinion extends Phaser.Sprite {
    constructor(game, spawn) {
        super(game, spawn.x, spawn.y, 'basicTurret');
        this.game = game;

        this.anchor.setTo(0.5, 0.5);
        this.game.stage.addChild(this);

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 2;
        this.x = spawn.x;
        this.y = spawn.y;
        this.lastMoved = new Date();
    }

    update() {
        let {grid} = this.game.gridManager;
        console.log("update");

        let currentCell = grid.xyToGridCell(this.x, this.y);
        let exitCell = grid.getExitCell();
        if (currentCell.equals(exitCell)) {
            console.log("MinorMinion escpaed!");
            return;
        }

        let path = grid.findPath({row: currentCell.row, col: currentCell.column});
        if (!path) {
            console.log('blocked');
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
                this.x = nextWaypoint.x;
                this.y = nextWaypoint.y;
                nextWaypointIndex++;
                console.log("Moved to next waypoint");
            } else {
                let percentThere = lengthToWalk / distanceToNextWaypoint;
                let additionalX = (nextWaypoint.x - this.x) * percentThere;
                let additionalY = (nextWaypoint.y - this.y) * percentThere;
                this.x += additionalX;
                this.y += additionalY;
                lengthToWalk = 0;
            }
        }

        this.angle += this.rotateSpeed;
    }

    _getDistance(pointA, pointB) {
        let AB = Math.abs(pointB.x - pointA.x);
        let BC = Math.abs(pointB.y - pointA.y);
        return Math.sqrt(Math.pow(AB, 2), Math.pow(BC, 2));
    }

    _calculateDistanceToMove() {
        let currentTime = new Date();
        let millisSinceLastMoved = currentTime - this.lastMoved;
        this.lastMoved = currentTime;

        return this.pixelsPerSecond * (millisSinceLastMoved / 1000);
    }
}

export default MinorMinion;