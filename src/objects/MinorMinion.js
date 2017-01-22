import Minion from './Minion';

class MinorMinion extends Minion {
    constructor(game, spawn) {
        super(game, spawn, 'minorMinion');

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 2;
        this.health = 5;
        this.bounty = 10;
    }
}

export default MinorMinion;