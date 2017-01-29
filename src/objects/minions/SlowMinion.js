import Minion from './Minion';

class SlowMinion extends Minion {
    constructor(game, spawn) {
        const health = 50;
        super(game, spawn, 'mummy', health);

        this.animations.add('walk');
        this.animations.play('walk', 50, true);

        this.pixelsPerSecond = 10;
        this.bounty = 4;
    }
}

export default SlowMinion;