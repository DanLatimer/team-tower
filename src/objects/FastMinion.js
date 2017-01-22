import Minion from './Minion';

class FastMinion extends Minion {
    constructor(game, spawn) {
        super(game, spawn, 'fastMinion');

        this.pixelsPerSecond = 80;
        this.rotateSpeed = 10;
        this.health = 7;
        this.bounty = 5;
    }
}

export default FastMinion;