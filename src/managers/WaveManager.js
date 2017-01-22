import MinorMinion from 'objects/MinorMinion';
import MajorMinion from 'objects/MajorMinion';
import SlowMinion from 'objects/SlowMinion';
import FastMinion from 'objects/FastMinion';

const Waves = [
    {
        numberOfMinions: 10,
        minionType: SlowMinion,
        waveDelay: 3 * 1000
    },
    {
        numberOfMinions: 20,
        minionType: MinorMinion,
        waveDelay: 1 * 1000
    },
    {
        numberOfMinions: 15,
        minionType: MajorMinion,
        waveDelay: 3 * 1000
    },
    {
        numberOfMinions: 30,
        minionType: FastMinion,
        waveDelay: 0.25 * 1000
    }
];

class WaveManager {

    constructor(game) {
        this.game = game;

        this.waveNumber = 0;
        this.timeSinceWaveStarted = new Date().getTime() + 5000;
        this.minionsToDeploy = Waves[0].numberOfMinions;
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
            this._deployMinion(wave.minionType);
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
        const minionsDeployed = wave.numberOfMinions - this.minionsToDeploy;

        const elapsedTillNextMinion = wave.waveDelay * minionsDeployed;
        const elapsedMillis = this._getWaveElapsedMillis();
        return elapsedMillis > elapsedTillNextMinion;
    }

    _triggerNextWave() {
        if (this.waveNumber >= Waves.length - 1) {
            if (this.getMinions().length == 0) {
                this.game.state.states['GameOverState'].win = true;
                this.game.state.start('GameOverState');                
            }

            return;
        }

        this.waveNumber++;
        this.minionsToDeploy = this._getWave().numberOfMinions;
        this.timeSinceWaveStarted = new Date();
    }

    _deployMinion(minionType) {
        this.minions.push(new minionType(this.game, this.initialCell.getCentroid()));
        this.minionsToDeploy--;
    }

    _getWaveTime() {
        const wave = this._getWave();

        return (wave.numberOfMinions * wave.waveDelay) + 7000;
    }
}

export default WaveManager;