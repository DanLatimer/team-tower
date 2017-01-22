
class SpeedButton extends Phaser.Button {

    constructor(game, position, speedType) {
        super(game, position.x, position.y, speedType);
        this.game = game;
        this.speedType = speedType;
        this.onInputDown.add(this._selectSpeed, this);
    }

    update() {

    }

    _selectSpeed() {
        this.game.waveManager.selectSpeed(this.speedType);
    }
}

export default SpeedButton;