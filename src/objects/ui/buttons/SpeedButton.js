import Button from './Button';

class SpeedButton extends Button {
    constructor(game, position, speedType) {
        super(game, position, speedType, {x: 30, y: 30});
        this.speedType = speedType;
    }

    update() {

    }

    onClick() {
        this.game.waveManager.selectSpeed(this.speedType);
    }
}

export default SpeedButton;