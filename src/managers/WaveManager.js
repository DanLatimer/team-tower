import MinorMinion from 'objects/MinorMinion';

class WaveManager {

    constructor(game) {
        this.game = game;

    }

    setup() {
        var initialCell = this.game.gridManager.grid.grid[0][0];
        
        new MinorMinion(this.game, initialCell.getCentroid());
    }

    update() {

    }
}

export default WaveManager;