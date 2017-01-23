
class SellButton extends Phaser.Button {
    constructor(game, position, cell) {
        super(game, position.x, position.y, 'sell');
        this.game = game;
        this.cell = cell;

        this.onInputDown.add(this._sell, this);
        this._setSize(15, 15);
    }

    _setSize(desiredWidth, desiredHeight) {
        const xScale = desiredWidth / this.width;
        const yScale = desiredHeight / this.height;

        this.scale.x = xScale;
        this.scale.y = yScale;
    }

    update() {

    }

    _sell() {
        const cell = this.cell;
        const game = this.game;

        setTimeout(() => {
            if (cell.contents === null || cell.contents === undefined) {
                return;
            }
            game.inventoryManager.sell(cell.contents);
            cell.destroyContents();
        }, 500);
    }
}

export default SellButton;