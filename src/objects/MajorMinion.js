import Minion from './Minion';

class MajorMinion extends Minion {
    constructor(game, spawn) {
        const health = 7;
        super(game, spawn, 'majorMinion', health);

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 4;
        this.bounty = 5;
    }
}

export default MajorMinion;