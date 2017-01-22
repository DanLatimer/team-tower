import Minion from './Minion';

class SlowMinion extends Minion {
    constructor(game, spawn) {
        super(game, spawn, 'slowMinion');

        this.pixelsPerSecond = 10;
        this.rotateSpeed = 2;
        this.health = 1;
        this.bounty = 4;
    }
}

export default SlowMinion;