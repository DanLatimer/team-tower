import Minion from './Minion';

class BossMinion extends Minion {
    constructor(game, spawn) {
        const health = 100;
        super(game, spawn, 'fireElemental', health);

        this.animations.add('walk');
        this.animations.play('walk', 50, true);

        this.pixelsPerSecond = 40;
        this.bounty = 50;
    }
}

export default BossMinion;