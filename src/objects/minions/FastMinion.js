import Minion from './Minion';

class FastMinion extends Minion {
    constructor(game, spawn) {
        const health = 2;
        super(game, spawn, 'zombie', health);

        this.animations.add('walk');
        this.animations.play('walk', 50, true);

        this.pixelsPerSecond = 80;
        this.health = 2;
        this.bounty = 5;
    }
}

export default FastMinion;