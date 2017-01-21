import MinorMinion from 'objects/MinorMinion';

class WaveManager {

    constructor(game) {
        this.game = game;

        this.waveNumber = 0;
        this.timeSinceWaveStarted = new Date();
        this.minionsToDeploy = Waves[0].minorMinions;
    }

    getMinions() {
        return this.minions;
    }

    removeMinion(minion) {
        this.minions = this.minions.filter((m) => { return (m != minion) });
        minion.destroy();
    }

    setup() {
        this.initialCell = this.game.gridManager.grid.grid[0][0];
        
        this.minions = [];
    }

    update() {
        const waveElapsedMillis = this._getWaveElapsedMillis();
        const wave = this._getWave();

        if (waveElapsedMillis > this._getWaveTime()) {
            this._triggerNextWave();
            return;
        }

        if (this._shouldDeployMinion()) {
            this._deployMinion();
            return;
        }
    }

    _getWaveElapsedMillis() {
        return new Date() - this.timeSinceWaveStarted;
    }

    _getWave() {
        return Waves[this.waveNumber];
    }

    _shouldDeployMinion() {
        if (this.minionsToDeploy <= 0) {
            return false;
        }
        const wave = this._getWave();
        const minionsDeployed = wave.minorMinions - this.minionsToDeploy;

        const elapsedTillNextMinion = wave.waveDelay * minionsDeployed;
        const elapsedMillis = this._getWaveElapsedMillis();
        return elapsedMillis > elapsedTillNextMinion;
    }

    _triggerNextWave() {
        if (this.waveNumber >= Waves.length - 1) {
            return;
        }

        this.waveNumber++;
        this.minionsToDeploy = this._getWave().minorMinions;
        this.timeSinceWaveStarted = new Date();
    }

    _deployMinion() {
        this.minions.push(new MinorMinion(this.game, this.initialCell.getCentroid()));
        this.minionsToDeploy--;
    }

    _getWaveTime() {
        const wave = this._getWave();

        return (wave.minorMinions * wave.waveDelay) + 7000;
    }
}

const Waves = [
    {
        minorMinions: 3,
        waveDelay: 3 * 1000
    },
    {
        minorMinions: 3,
        waveDelay: 3 * 1000
    },
    {
        minorMinions: 3,
        waveDelay: 3 * 1000
    }
];

export default WaveManager;