import Minion from './Minion';

class FastMinion extends Minion {
    constructor(game, spawn) {
        const health = 2;
        super(game, spawn, 'fastMinion', health);

        this.pixelsPerSecond = 80;
        this.rotateSpeed = 10;
        this.health = 2;
        this.bounty = 5;
    }
}

export default FastMinion;