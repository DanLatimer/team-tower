import Minion from './Minion';

class SlowMinion extends Minion {
    constructor(game, spawn) {
        const health = 1;
        super(game, spawn, 'slowMinion', health);

        this.pixelsPerSecond = 10;
        this.rotateSpeed = 2;
        this.bounty = 4;
    }
}

export default SlowMinion;