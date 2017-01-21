import MinorMinion from 'objects/MinorMinion';

class WaveManager {

    constructor(game) {
        this.game = game;

    }

    setup() {
        let initialCell = this.game.gridManager.grid.grid[0][0];

        this.minions = [
            new MinorMinion(this.game, initialCell.getCentroid())
        ];
    }

    update() {

    }

    getMinions() {
        return this.minions;
    }

    removeMinion(minion) {
        this.minions = this.minions.filter((m) => { return (m != minion) });
        minion.destroy();
    }
}

export default WaveManager;