import MinorMinion from 'objects/minions/MinorMinion';
import MajorMinion from 'objects/minions/MajorMinion';
import SlowMinion from 'objects/minions/SlowMinion';
import FastMinion from 'objects/minions/FastMinion';
import BossMinion from 'objects/minions/BossMinion';

export const Difficulties = [
    {
        name: 'easy',
        lives: 10,
        coins: 100,
        waves : [
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
        ]
    },
    {
        name: 'medium',
        lives: 5,
        coins: 160,
        waves : [
            {
                numberOfMinions: 5,
                minionType: SlowMinion,
                waveDelay: 2 * 1000
            },
            {
                numberOfMinions: 10,
                minionType: MinorMinion,
                waveDelay: 1 * 1000
            },
            {
                numberOfMinions: 10,
                minionType: MajorMinion,
                waveDelay: 3 * 1000
            },
            {
                numberOfMinions: 30,
                minionType: FastMinion,
                waveDelay: 0.25 * 1000
            },
            {
                numberOfMinions: 3,
                minionType: BossMinion,
                waveDelay: 15 * 1000
            },
            {
                numberOfMinions: 40,
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
                numberOfMinions: 10,
                minionType: BossMinion,
                waveDelay: 3 * 1000
            }
        ]
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
        this.speed = 1;
        this.selectedDifficulty = null;
    }

    getSpeed() {
        return this.speed;
    }

    getMinions() {
        return this.minions;
    }

    removeMinion(minionToRemove) {
        this.minions = this.minions.filter(minion => minion != minionToRemove);
        minionToRemove.destroy();
    }

    setup() {
        this.initialCell = this.game.gridManager.grid.grid[0][0];
        
        this.minions = [];
    }

    startFirstRound(difficulty) {
        this.selectedDifficulty = difficulty;
        this.minionsToDeploy = this.selectedDifficulty.waves[0].numberOfMinions;
    }

    update() {
        if (this.paused || !this.selectedDifficulty) {
            return;
        }
        if (this._shouldStartNextWave()) {
            this._triggerNextWave();
            return;
        }

        if (this._shouldDeployMinion()) {
            if (!this.musicPlaying) {
                this.game.audio.music.themeMusic.loop = true;
                this.game.audio.music.themeMusic.play();
                this.musicPlaying = true;
            }
            this._deployMinion(this._getWave().minionType);
            return;
        }
    }

    destroy() {
        this.paused = true;
        this.minions.forEach(minion => minion.setVisible(false));
    }

    _shouldStartNextWave() {
        return this.minionsToDeploy <= 0 && this._isMinionDelayElapsed();
    }

    selectSpeed(speed) {
        let fxVolume = 1;
        switch(speed) {
            case WaveManager.SPEEDS.slow:
                this.speed = 1;
                break;
            case WaveManager.SPEEDS.medium:
                this.speed = 2;
                fxVolume = 0.6;
                break;
            case WaveManager.SPEEDS.fast:
                this.speed = 4;
                fxVolume = 0.2;
                break;
        }
        this.game.audioManager.setFxVolume(fxVolume);

        this.game.gridManager.setSpeed(this.speed);
        this.minions.forEach(minion => minion.setSpeed(this.speed));
    }

    _getWaveDelay() {
        return this._getWave().waveDelay / this.speed;
    }

    _getWave() {
        return this.selectedDifficulty.waves[this.waveNumber];
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
        if (this.waveNumber >= this.selectedDifficulty.waves.length - 1) {
            if (this.getMinions().length == 0) {
                this.game.cursorManager.setCursor();
                this.game.state.states['GameState'].destroy();
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