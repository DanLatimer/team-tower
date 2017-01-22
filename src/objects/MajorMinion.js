import Minion from './Minion';

class MajorMinion extends Minion {
    constructor(game, spawn) {
        super(game, spawn, 'majorMinion');

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 4;
        this.health = 5;
        this.bounty = 20;
    }
}

export default MajorMinion;