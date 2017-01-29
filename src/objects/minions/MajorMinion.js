import Minion from './Minion';

class MajorMinion extends Minion {
    constructor(game, spawn) {
        const health = 200;
        super(game, spawn, 'slime', health);

        this.animations.add('walk');
        this.animations.play('walk', 50, true);

        this.pixelsPerSecond = 40;
        this.bounty = 5;
    }
}

export default MajorMinion;