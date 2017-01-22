import Minion from './Minion';

class MinorMinion extends Minion {
    constructor(game, spawn) {
        super(game, spawn, 'minorMinion');

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 2;
        this.health = 2;
        this.bounty = 3;
    }
}

export default MinorMinion;