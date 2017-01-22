import Minion from './Minion';

class MinorMinion extends Minion {
    constructor(game, spawn) {
        const health = 2;
        super(game, spawn, 'slime', health);

        this.animations.add('walk');
        this.animations.play('walk', 50, true);

        this.pixelsPerSecond = 40;
        this.rotateSpeed = 2;
        this.bounty = 3;
    }
}

export default MinorMinion;