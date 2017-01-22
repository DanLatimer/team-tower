import MinorMinion from 'objects/MinorMinion';
import MajorMinion from 'objects/MajorMinion';
import SlowMinion from 'objects/SlowMinion';
import FastMinion from 'objects/FastMinion';
import BossMinion from 'objects/BossMinion';

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
        numberOfMinions: 1,
        minionType: BossMinion,
        waveDelay: 15 * 1000
    },
    {
        numberOfMinions: 30,
        minionType: FastMinion,
        waveDelay: 0.25 * 1000
    },
    {
        numberOfMinions: 20,
        minionType: MinorMinion,
        waveDelay: 0.5 * 1000
    },
    {
        numberOfMinions: 15,
        minionType: MajorMinion,
        waveDelay: 1.5 * 1000
    },
    {
        numberOfMinions: 3,
        minionType: BossMinion,
        waveDelay: 3 * 1000
    }
];

class WaveManager {

    static get SPEEDS() {
        return {
            slow: 'slow',
            medium: 'medium',
            fast: 'fast'
        };
    }

    constructor(game) {
        this.game = game;

        this.waveNumber = 0;
        this.timeSinceMinionDeployed = new Date().getTime() + 5000;
        this.minionsToDeploy = Waves[0].numberOfMinions;
        this.speed = 1;
    }

    getSpeed() {
        return this.speed;
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
        if (this._shouldStartNextWave()) {
            this._triggerNextWave();
            return;
        }

        if (this._shouldDeployMinion()) {
            if (!this.musicPlaying) {
                this.game.audio.themeMusic.loop = true;
                this.game.audio.themeMusic.play();
                this.musicPlaying = true;
            }
            this._deployMinion(this._getWave().minionType);
            return;
        }
    }

    _shouldStartNextWave() {
        return this.minionsToDeploy <= 0 && this._isMinionDelayElapsed();
    }

    selectSpeed(speed) {
        switch(speed) {
            case WaveManager.SPEEDS.slow:
                this.speed = 1;
                break;
            case WaveManager.SPEEDS.medium:
                this.speed = 2;
                break;
            case WaveManager.SPEEDS.fast:
                this.speed = 4;
                break;
        }
        this.game.gridManager.setSpeed(this.speed);
        this.minions.forEach(minion => minion.setSpeed(this.speed));
    }

    _getWaveDelay() {
        return this._getWave().waveDelay / this.speed;
    }

    _getWave() {
        return Waves[this.waveNumber];
    }

    _shouldDeployMinion() {
        if (this.minionsToDeploy <= 0) {
            return false;
        }

        return this._isMinionDelayElapsed();
    }

    _isMinionDelayElapsed() {
        const elapsedSinceLastMinion = new Date().getTime() - this.timeSinceMinionDeployed;
        return elapsedSinceLastMinion > this._getWaveDelay();
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
        this.timeSinceMinionDeployed = new Date();
    }

    _deployMinion(minionType) {
        this.timeSinceMinionDeployed = new Date();
        const minion = new minionType(this.game, this.initialCell.getCentroid());
        minion.setSpeed(this.speed);
        this.minions.push(minion);
        this.minionsToDeploy--;
    }
}

export default WaveManager;