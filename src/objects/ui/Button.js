class Button extends Phaser.Button {
    constructor(game, position, sprite, size) {
        super(game, position.x, position.y, sprite);
        this.game = game;

        this.onInputDown.add(this.onClick, this);
        if (size && size.x && size.y) {
            this._setSize(size.x, size.y);    
        }
    }

    _setSize(desiredWidth, desiredHeight) {
        const xScale = desiredWidth / this.width;
        const yScale = desiredHeight / this.height;

        this.scale.x = xScale;
        this.scale.y = yScale;
    }

    update() {

    }

    onClick() {

    }
}

export default Button;