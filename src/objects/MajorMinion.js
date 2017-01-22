import Minion from './Minion';

class MajorMinion extends Minion {
    constructor(game, spawn) {
        super(game, spawn, 'majorMinion');

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 4;
        this.health = 7;
        this.bounty = 10;
    }
}

export default MajorMinion;