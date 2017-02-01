import {getScale} from '../../Scaler';

class Button extends Phaser.Button {
    constructor(game, position, sprite, size) {
        super(game, position.x, position.y, sprite);
        this.game = game;

        this.onInputDown.add(this.onClick, this);
        if (size) {
            this.scale = getScale(this.width, this.height, size.x, size.y);
        }
    }

    update() {

    }

    onClick() {

    }
}

export default Button;